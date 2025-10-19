/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchApplicationDto {
  @ApiPropertyOptional({
    description: 'Filter by job title',
    example: 'Frontend Developer',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Filter by company owner ID',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  ownerId?: number;

  @ApiPropertyOptional({
    description: 'Filter by user ID (applicant)',
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number;

  @ApiPropertyOptional({ description: 'Filter by job ID', example: 5 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  jobId?: number;

  @ApiPropertyOptional({ description: 'Filter by company ID', example: 3 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  companyId?: number;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ description: 'Limit per page', example: 10 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({ description: 'Sort by field', example: 'createdAt' })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({
    description: 'Fields to include',
    example: 'title,status',
  })
  @IsOptional()
  @IsString()
  fields?: string;

  @ApiPropertyOptional({
    description: 'Relations to include',
    example: 'user,job',
  })
  @IsOptional()
  @IsString()
  include?: string;
}
