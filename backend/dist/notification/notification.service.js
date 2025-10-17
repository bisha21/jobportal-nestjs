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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let NotificationService = class NotificationService {
    prisma;
    notificationQueue;
    constructor(prisma, notificationQueue) {
        this.prisma = prisma;
        this.notificationQueue = notificationQueue;
    }
    async createNotification(dto) {
        await this.notificationQueue.add('sendNotification', dto, {
            attempts: 3,
            removeOnComplete: true,
        });
        console.log('Notification job queued for user', dto.userId);
        return { message: 'Notification queued' };
    }
    async findAll(userId) {
        return this.prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async delete(id) {
        const notif = await this.prisma.notification.findUnique({ where: { id } });
        if (!notif)
            throw new common_1.NotFoundException('Notification not found');
        return this.prisma.notification.delete({ where: { id } });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)('notification-queue')),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        bullmq_2.Queue])
], NotificationService);
//# sourceMappingURL=notification.service.js.map