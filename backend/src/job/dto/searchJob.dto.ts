/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchJobDto {
  @ApiPropertyOptional({
    description: 'Filter by job title',
    example: 'Frontend Developer',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Filter by job location',
    example: 'Remote',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Filter by job type',
    example: 'FULLTIME',
  })
  @IsOptional()
  @IsString()
  jobType?: string;

  @ApiPropertyOptional({ description: 'Filter by company ID', example: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  companyId?: number;

  @ApiPropertyOptional({ description: 'Filter by category ID', example: 2 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional({
    description: 'Filter by minimum salary',
    example: 30000,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  salaryMin?: number;

  @ApiPropertyOptional({
    description: 'Filter by maximum salary',
    example: 50000,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  salaryMax?: number;

  @ApiPropertyOptional({ description: 'Pagination page number', example: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    description: 'Pagination limit per page',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({ description: 'Sorting field', example: 'salaryMax' })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({
    description: 'Fields to include in response',
    example: 'title,companyId',
  })
  @IsOptional()
  @IsString()
  fields?: string;

  @ApiPropertyOptional({
    description: 'Relations to include',
    example: 'company,category',
  })
  @IsOptional()
  @IsString()
  include?: string;

  @ApiPropertyOptional({
    description: 'Filter by owner ID (company owner)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  ownerId?: number;
}
