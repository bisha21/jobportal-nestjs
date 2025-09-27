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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let MessageService = class MessageService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createConversation(createConversationDto, userId) {
        const { jobId, participants } = createConversationDto;
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            include: { company: true },
        });
        if (!job)
            throw new common_1.NotFoundException('Job is not found');
        const employeeId = job.company.ownerId;
        let conversation = await this.prisma.conversation.findFirst({
            where: {
                jobId,
                participants: { some: { id: userId } },
            },
            select: {
                id: true,
                jobId: true,
                createdAt: true,
                updatedAt: true,
                participants: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        profile: true,
                        phoneNumber: true,
                        role: true,
                    },
                },
                messages: {
                    select: {
                        id: true,
                        senderId: true,
                        receiverId: true,
                        content: true,
                        read: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        if (!conversation) {
            const participantIds = [employeeId, userId, ...(participants || [])];
            const uniqueParticipantIds = [...new Set(participantIds)];
            conversation = await this.prisma.conversation.create({
                data: {
                    jobId,
                    participants: {
                        connect: uniqueParticipantIds.map((id) => ({ id })),
                    },
                },
                select: {
                    id: true,
                    jobId: true,
                    createdAt: true,
                    updatedAt: true,
                    participants: {
                        select: {
                            id: true,
                            email: true,
                            fullName: true,
                            profile: true,
                            phoneNumber: true,
                            role: true,
                        },
                    },
                    messages: {
                        select: {
                            id: true,
                            senderId: true,
                            receiverId: true,
                            content: true,
                            read: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            });
        }
        return conversation;
    }
    async sendMessage(createMessageDto, userId) {
        const { receiverId, conversationId, content } = createMessageDto;
        const message = await this.prisma.message.create({
            data: {
                senderId: userId,
                receiverId,
                conversationId,
                content,
            },
        });
        return message;
    }
    async getAllMessageByConversation(conversationId) {
        const messages = await this.prisma.message.findMany({
            where: { conversationId },
            select: {
                id: true,
                senderId: true,
                receiverId: true,
                content: true,
                read: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return messages;
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], MessageService);
//# sourceMappingURL=message.service.js.map