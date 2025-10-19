/* eslint-disable prettier/prettier */
import { IsInt, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

// -------------------- Conversation DTOs --------------------
export class CreateConversationDto {
  @ApiPropertyOptional({ description: 'Associated job ID', example: 1 })
  @IsOptional()
  @IsInt()
  jobId?: number;

  @ApiPropertyOptional({
    description: 'List of participant user IDs',
    type: [Number],
    example: [2, 3, 4],
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  participants?: number[];
}

export class UpdateConversationDto {
  @ApiPropertyOptional({ description: 'Associated job ID', example: 1 })
  @IsOptional()
  @IsInt()
  jobId?: number;

  @ApiPropertyOptional({
    description: 'List of participant user IDs',
    type: [Number],
    example: [2, 3, 4],
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  participants?: number[];
}
