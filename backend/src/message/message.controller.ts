/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MessageService } from './message.service';
import { CreateConversationDto } from './dto/createConversation.dto';
import { CreateMessageDto } from './dto/createMessage.dto';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from 'src/common/guards/auth/auth.guard';

@ApiTags('Messages')
@ApiBearerAuth()
@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  @ApiOperation({ summary: 'Get all conversations (Admin use)' })
  @ApiResponse({
    status: 200,
    description: 'List of all conversations retrieved successfully',
  })
  async getAllApplicants() {
    return await this.messageService.getAllConversation();
  }

  @Post('conversation')
  @ApiOperation({ summary: 'Create or get a conversation for a specific job' })
  @ApiBody({ type: CreateConversationDto })
  @ApiResponse({
    status: 201,
    description: 'Conversation created or retrieved successfully',
  })
  async createConversation(
    @Req() req: RequestWithUser,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    const userId = req.user.id;
    return this.messageService.createConversation(
      createConversationDto,
      userId,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Send a message in a conversation' })
  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({
    status: 201,
    description: 'Message sent successfully',
  })
  async sendMessage(
    @Req() req: RequestWithUser,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    const userId = req.user.id;
    return this.messageService.sendMessage(createMessageDto, userId);
  }

  @Get('conversation/:conversationId')
  @ApiOperation({ summary: 'Get all messages for a conversation' })
  @ApiResponse({
    status: 200,
    description: 'List of messages retrieved successfully',
  })
  async getMessagesByConversation(
    @Param('conversationId', ParseIntPipe) conversationId: number,
  ) {
    return this.messageService.getAllMessageByConversation(conversationId);
  }

  @Get('applicants')
  @ApiOperation({
    summary: 'Get all applicants for the company owner',
    description:
      'Fetches all applicants for jobs owned by the authenticated company owner, including their conversation IDs.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of applicants with conversation details',
  })
  getApplicantsForCompanyOwner(@Req() req: RequestWithUser) {
    const ownerId = req.user.id;
    return this.messageService.getApplicantsForCompanyOwner(ownerId);
  }

  // ✅ Add this missing @Get decorator
  @Get('user-applications')
  @ApiOperation({
    summary: 'Get all jobs the logged-in user has applied to',
    description:
      'Returns a list of all jobs that the logged-in user has applied for, including job and company info, conversationId, and timestamps.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of user applications retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          jobId: { type: 'number', example: 12 },
          jobTitle: { type: 'string', example: 'Frontend Developer' },
          companyName: { type: 'string', example: 'TechNepal Pvt. Ltd.' },
          companyProfile: {
            type: 'string',
            nullable: true,
            example: 'https://example.com/logo.png',
          },
          conversationId: { type: 'number', nullable: true, example: 5 },
          timestamp: { type: 'string', nullable: true, example: '2 hours ago' },
          unread: { type: 'number', example: 0 },
          online: { type: 'boolean', example: false },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserApplicaton(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.messageService.getJobsUserAppliedTo(userId);
  }
}
