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
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const message_service_1 = require("./message.service");
const createMessage_dto_1 = require("./dto/createMessage.dto");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
let MessageGateway = class MessageGateway {
    messageService;
    jwtService;
    server;
    constructor(messageService, jwtService) {
        this.messageService = messageService;
        this.jwtService = jwtService;
    }
    handleConnection(client) {
        try {
            const token = client.handshake.query?.token ||
                client.handshake.auth?.token ||
                client.handshake.headers.authorization;
            if (!token)
                throw new common_1.UnauthorizedException('No token provided');
            const jwt = token.replace('Bearer ', '');
            const payload = this.jwtService.verify(jwt);
            client.user = { id: payload.sub, email: payload.email };
            console.log(`✅ User ${client.user.id} connected via socket ${client.id}`);
        }
        catch (err) {
            console.error('❌ Socket connection failed:', err.message);
            client.disconnect(true);
        }
    }
    handleDisconnect(client) {
        console.log(`❌ User ${client.user?.id || 'Unknown'} disconnected: ${client.id}`);
    }
    async sendMessage(createMessageDto, client) {
        try {
            if (!client.user)
                throw new common_1.UnauthorizedException('User not authenticated');
            const message = await this.messageService.sendMessage(createMessageDto, client.user.id);
            this.server
                .to(`conversation_${createMessageDto.conversationId}`)
                .emit('newMessage', message);
            return { status: 'ok', message };
        }
        catch (err) {
            console.error('❌ Error sending message:', err.message);
            client.emit('errorMessage', { error: err.message });
        }
    }
    async joinConversationRoom(conversationId, client) {
        try {
            if (!client.user)
                throw new common_1.UnauthorizedException('User not authenticated');
            await client.join(`conversation_${conversationId}`);
            console.log(`✅ User ${client.user.id} joined conversation_${conversationId}`);
            client.emit('joinedRoom', { conversationId });
        }
        catch (err) {
            console.error('❌ Error joining room:', err.message);
            client.emit('errorMessage', { error: err.message });
        }
    }
};
exports.MessageGateway = MessageGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMessage_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "sendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinConversationRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "joinConversationRoom", null);
exports.MessageGateway = MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        jwt_1.JwtService])
], MessageGateway);
//# sourceMappingURL=message.gateway.js.map