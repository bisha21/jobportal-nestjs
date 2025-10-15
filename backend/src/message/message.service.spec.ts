/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';

describe('MessageService', () => {
  let service: MessageService;

  const mockPrisma = {
    job: { findUnique: jest.fn() },
    company: { findUnique: jest.fn() },
    conversation: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
    },
    message: { create: jest.fn(), findMany: jest.fn() },
    application: { findMany: jest.fn() },
    user: { findUnique: jest.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: DatabaseService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createConversation', () => {
    it('should throw NotFoundException if job not found', async () => {
      mockPrisma.job.findUnique.mockResolvedValue(null);
      await expect(
        service.createConversation({ jobId: 1, participants: [] }, 1),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create conversation if not exists', async () => {
      mockPrisma.job.findUnique.mockResolvedValue({
        id: 1,
        company: { ownerId: 2 },
      });
      mockPrisma.conversation.findFirst.mockResolvedValue(null);
      mockPrisma.conversation.create.mockResolvedValue({
        id: 1,
        participants: [{ id: 1 }, { id: 2 }],
      });

      const result = await service.createConversation(
        { jobId: 1, participants: [3] },
        1,
      );

      expect(result).toEqual({ id: 1, participants: [{ id: 1 }, { id: 2 }] });
      expect(mockPrisma.conversation.create).toHaveBeenCalled();
    });

    it('should return existing conversation if found', async () => {
      const convo = { id: 10, participants: [{ id: 1 }, { id: 2 }] };
      mockPrisma.conversation.findFirst.mockResolvedValue(convo);

      const result = await service.createConversation({ participants: [2] }, 1);
      expect(result).toEqual(convo);
      expect(mockPrisma.conversation.create).not.toHaveBeenCalled();
    });
  });

  describe('sendMessage', () => {
    it('should throw NotFoundException if receiverId missing', async () => {
      await expect(
        service.sendMessage({ receiverId: undefined, content: 'Hi' } as any, 1),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create a message if conversation exists', async () => {
      mockPrisma.conversation.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.message.create.mockResolvedValue({ id: 1, content: 'Hello' });

      const dto: CreateMessageDto = {
        receiverId: 2,
        conversationId: 1,
        content: 'Hello',
      };
      const result = await service.sendMessage(dto, 1);

      expect(result).toEqual({ id: 1, content: 'Hello' });
      expect(mockPrisma.message.create).toHaveBeenCalledWith({
        data: {
          senderId: 1,
          receiverId: 2,
          conversationId: 1,
          content: 'Hello',
        },
      });
    });
  });

  describe('getAllMessageByConversation', () => {
    it('should throw NotFoundException if conversation not found', async () => {
      mockPrisma.conversation.findUnique.mockResolvedValue(null);
      await expect(service.getAllMessageByConversation(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return messages', async () => {
      mockPrisma.conversation.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.message.findMany.mockResolvedValue([
        { id: 1, content: 'Hello' },
      ]);

      const result = await service.getAllMessageByConversation(1);
      expect(result).toEqual([{ id: 1, content: 'Hello' }]);
    });
  });

  describe('getAllConversation', () => {
    it('should return all conversations', async () => {
      const conversations = [{ id: 1, participants: [], messages: [] }];
      mockPrisma.conversation.findMany.mockResolvedValue(conversations);

      const result = await service.getAllConversation();
      expect(result).toEqual(conversations);
    });
  });
});
