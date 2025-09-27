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
let ApplicationService = class ApplicationService {
    prisma;
    notificationService;
    notificationGateway;
    constructor(prisma, notificationService, notificationGateway) {
        this.prisma = prisma;
        this.notificationService = notificationService;
        this.notificationGateway = notificationGateway;
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
    async getAllApplications() {
        return await this.prisma.application.findMany({
            include: {
                user: true,
                job: true,
            },
        });
    }
    async getApplicationById(applicationId) {
        const application = await this.prisma.application.findUnique({
            where: { id: applicationId },
            include: { user: true, job: true },
        });
        if (!application)
            throw new common_1.NotFoundException('Application not found');
        return application;
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
        return await this.prisma.application.delete({
            where: { id: applicationId },
        });
    }
    async getApplicationsByUser(userId) {
        return await this.prisma.application.findMany({
            where: { userId },
            include: { job: true },
        });
    }
    async getApplicationsByJob(jobId) {
        return await this.prisma.application.findMany({
            where: { jobId },
            include: { user: true },
        });
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        notification_service_1.NotificationService,
        notification_gateway_1.NotificationGateway])
], ApplicationService);
//# sourceMappingURL=application.service.js.map