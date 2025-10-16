"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const notification_service_1 = require("../notification/notification.service");
const notification_gateway_1 = require("../notification/notification.gateway");
const apiFeatures_1 = require("../utils/apiFeatures");
const redis_service_1 = require("../redis/redis.service");
let ApplicationService = class ApplicationService {
    prisma;
    notificationService;
    notificationGateway;
    redis;
    constructor(prisma, notificationService, notificationGateway, redis) {
        this.prisma = prisma;
        this.notificationService = notificationService;
        this.notificationGateway = notificationGateway;
        this.redis = redis;
    }
    async applyJob(userId, jobId, createApplicationDto) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job)
            throw new common_1.NotFoundException('Job not found');
        const company = await this.prisma.company.findUnique({
            where: { id: job.companyId },
        });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        let application;
        try {
            application = await this.prisma.application.create({
                data: {
                    userId,
                    jobId,
                    ...createApplicationDto,
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('You have already applied to this job');
            }
            throw error;
        }
        const message = `User ${userId} applied for your job "${job.title}"`;
        await this.notificationService.createNotification({
            userId: company.ownerId,
            type: 'New Application',
            message,
        });
        this.notificationGateway.server
            .to(`user_${company.ownerId}`)
            .emit('notification:created', {
            type: 'New Application',
            message,
        });
        return application;
    }
    async getAllApplications(query) {
        const cacheKey = `applications:${JSON.stringify(query)}`;
        const cachedData = await this.redis.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        try {
            const features = new apiFeatures_1.ApiFeaturesPrisma(query)
                .sort()
                .paginate()
                .limitFields()
                .includeRelations();
            const options = features.getOptions();
            options.include = {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        resume: true,
                    },
                },
                job: {
                    select: {
                        id: true,
                        title: true,
                        location: true,
                        type: true,
                        company: {
                            select: {
                                id: true,
                                name: true,
                                ownerId: true,
                            },
                        },
                    },
                },
            };
            options.where = {};
            if (query.jobId) {
                options.where.jobId = query.jobId;
            }
            if (query.ownerId) {
                options.where.job = {
                    company: { ownerId: query.ownerId },
                };
            }
            const applications = await this.prisma.application.findMany(options);
            await this.redis.set(cacheKey, JSON.stringify(applications));
            return applications;
        }
        catch (error) {
            console.error('getAllApplications error:', error);
            throw new common_1.InternalServerErrorException('Failed to fetch applications');
        }
    }
    async updateApplication(applicationId, updateApplicationDto) {
        const app = await this.prisma.application.findUnique({
            where: { id: applicationId },
            include: {
                user: true,
                job: true,
            },
        });
        if (!app)
            throw new common_1.NotFoundException('Application not found');
        const updatedApp = await this.prisma.application.update({
            where: { id: applicationId },
            data: updateApplicationDto,
        });
        if (updateApplicationDto.status &&
            (updateApplicationDto.status === 'APPROVED' ||
                updateApplicationDto.status === 'REJECTED')) {
            const status = updateApplicationDto.status;
            const message = `Your application for "${app.job.title}" has been ${status.toLowerCase()}.`;
            await this.notificationService.createNotification({
                userId: app.userId,
                type: 'Application Status',
                message,
            });
            this.notificationGateway.server
                .to(`user_${app.userId}`)
                .emit('notification:created', { type: 'Application Status', message });
        }
        return updatedApp;
    }
    async deleteApplication(applicationId) {
        const app = await this.prisma.application.findUnique({
            where: { id: applicationId },
        });
        if (!app)
            throw new common_1.NotFoundException('Application not found');
        await this.redis.del(`applications:${applicationId}`);
        return await this.prisma.application.delete({
            where: { id: applicationId },
        });
    }
    async getApplicationsByUser(userId) {
        const cached = await this.redis.get(`applications:user:${userId}`);
        if (cached)
            return JSON.parse(cached);
        if (!userId)
            throw new common_1.NotFoundException('User not found');
        const user = await this.prisma.application.findMany({
            where: { userId },
            include: { job: true },
        });
        await this.redis.set(`applications:user:${userId}`, JSON.stringify(user), 600);
        return user;
    }
    async getApplicationsByJob(jobId) {
        if (!jobId)
            throw new common_1.NotFoundException('Job not found');
        const cache = await this.redis.get(`applications:job:${jobId}`);
        if (cache)
            return JSON.parse(cache);
        const applications = await this.prisma.application.findMany({
            where: { jobId },
            include: { user: true },
        });
        await this.redis.set(`applications:job:${jobId}`, JSON.stringify(applications), 600);
        return applications;
    }
    async getApplicationsById(id) {
        const cache = await this.redis.get(`application:${id}`);
        if (cache)
            return JSON.parse(cache);
        const application = await this.prisma.application.findUnique({
            where: { id },
        });
        if (!application)
            throw new common_1.NotFoundException('Application not found');
        const applications = await this.prisma.application.findUnique({
            where: { id },
            include: {
                user: true,
                job: true,
            },
        });
        await this.redis.set(`application:${id}`, JSON.stringify(applications), 600);
        return applications;
    }
    async checkIfApplied(userId, jobId) {
        const existing = await this.prisma.application.findFirst({
            where: { userId, jobId },
        });
        return !!existing;
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        notification_service_1.NotificationService,
        notification_gateway_1.NotificationGateway,
        redis_service_1.RedisService])
], ApplicationService);
//# sourceMappingURL=application.service.js.map