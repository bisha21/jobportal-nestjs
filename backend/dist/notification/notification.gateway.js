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
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const notification_service_1 = require("./notification.service");
const createnotification_dto_1 = require("./dto/createnotification.dto");
let NotificationGateway = class NotificationGateway {
    notificationService;
    server;
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    users = new Map();
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    async joinUserRoom(userId, client) {
        await client.join(`user_${userId}`);
        this.users.set(userId, client.id);
        console.log(`User ${userId} joined room user_${userId}`);
    }
    async createNotification(payload) {
        try {
            const dto = typeof payload === 'string' ? JSON.parse(payload) : payload;
            await this.notificationService.createNotification(dto);
            return { success: true, message: 'Notification queued' };
        }
        catch (err) {
            return { success: false, error: err.message };
        }
    }
    async readNotification(userId) {
        try {
            const notifications = await this.notificationService.findAll(userId);
            return { success: true, data: notifications };
        }
        catch (err) {
            return { success: false, error: err.message };
        }
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('JoinUserRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "joinUserRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('notification:create'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createnotification_dto_1.CreateNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "createNotification", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('notification:read'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "readNotification", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
    }),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map