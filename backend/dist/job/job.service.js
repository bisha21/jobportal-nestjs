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
var JobService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const apiFeatures_1 = require("../utils/apiFeatures");
let JobService = JobService_1 = class JobService {
    prisma;
    logger = new common_1.Logger(JobService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createJob(createJobDto) {
        const company = await this.prisma.company.findUnique({
            where: { id: createJobDto.companyId },
        });
        if (!company) {
            this.logger.warn(`Attempted to create job for non-existent company ID ${createJobDto.companyId}`);
            throw new common_1.NotFoundException('Company not found');
        }
        const job = await this.prisma.job.create({ data: createJobDto });
        this.logger.log(`Job created with ID ${job.id}`);
        return job;
    }
    async getAllJobs(query) {
        const features = new apiFeatures_1.ApiFeaturesPrisma(query)
            .filter()
            .sort()
            .paginate()
            .limitFields()
            .includeRelations();
        const options = features.getOptions();
        const jobs = await this.prisma.job.findMany({
            ...options,
            where: {
                ...options.where,
                ...(query.salaryMin && query.salaryMax
                    ? {
                        AND: [
                            { salaryMin: { lte: Number(query.salaryMax) } },
                            { salaryMax: { gte: Number(query.salaryMin) } },
                        ],
                    }
                    : {}),
            },
            include: {
                category: {
                    select: {
                        id: true,
                        categoryName: true,
                    },
                },
                company: {
                    select: {
                        id: true,
                        name: true,
                        logoUrl: true,
                    },
                },
            },
        });
        this.logger.log(`Fetched ${jobs.length} jobs`);
        return jobs;
    }
    async getSingleJob(jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            include: {
                jobSkills: {
                    select: {
                        skill: true,
                    },
                },
                company: true,
                category: true,
            },
        });
        if (!job) {
            this.logger.warn(`Job not found with ID ${jobId}`);
            throw new common_1.NotFoundException(`Job with ID ${jobId} not found`);
        }
        this.logger.log(`Fetched job with ID ${jobId}`);
        return job;
    }
    async updateJob(jobId, updateJobDto) {
        const updatedJob = await this.prisma.job.update({
            where: { id: jobId },
            data: updateJobDto,
        });
        this.logger.log(`Updated job with ID ${jobId}`);
        return updatedJob;
    }
    async deleteJob(jobId) {
        const deletedJob = await this.prisma.job.delete({ where: { id: jobId } });
        this.logger.log(`Deleted job with ID ${jobId}`);
        return deletedJob;
    }
};
exports.JobService = JobService;
exports.JobService = JobService = JobService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], JobService);
//# sourceMappingURL=job.service.js.map