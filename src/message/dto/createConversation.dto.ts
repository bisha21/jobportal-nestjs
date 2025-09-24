/* eslint-disable prettier/prettier */
// conversation.dto.ts
import { IsInt, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConversationDto {
  @IsOptional()
  @IsInt()
  jobId?: number;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  participants?: number[]; // list of userIds
}

export class UpdateConversationDto {
  @IsOptional()
  @IsInt()
  jobId?: number;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  participants?: number[];
}
