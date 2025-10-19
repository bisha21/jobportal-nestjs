/* eslint-disable prettier/prettier */
import { IsInt, IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'ID of the message receiver', example: 2 })
  @IsInt()
  receiverId: number;

  @ApiProperty({ description: 'ID of the conversation', example: 1 })
  @IsInt()
  conversationId: number;

  @ApiProperty({
    description: 'Content of the message',
    example: 'Hello there!',
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: 'Whether the message is read',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  read?: boolean;
}

export class UpdateMessageDto {
  @ApiPropertyOptional({
    description: 'Updated content of the message',
    example: 'Updated text',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'Update read status of the message',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  read?: boolean;
}
