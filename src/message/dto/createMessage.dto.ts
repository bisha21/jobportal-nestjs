/* eslint-disable prettier/prettier */
// message.dto.ts
import { IsInt, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  receiverId: number;

  @IsInt()
  conversationId: number;

  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  read?: boolean;
}

export class UpdateMessageDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  read?: boolean;
}
