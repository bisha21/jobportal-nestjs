/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class SearchCompanyDto {
  @ApiPropertyOptional({
    description: 'Filter by company name',
    example: 'Tech Solutions',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by location',
    example: 'Kathmandu',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Filter by industry',
    example: 'Software Development',
  })
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiPropertyOptional({
    description: 'Filter by company size',
    example: '50-100 employees',
  })
  @IsOptional()
  @IsString()
  companySize?: string;

  @ApiPropertyOptional({
    description: 'Filter by website',
    example: 'https://techsolutions.com',
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiPropertyOptional({ description: 'Filter by owner ID', example: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  ownerId?: number;

  // Pagination
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

  // Sorting
  @ApiPropertyOptional({ description: 'Sort field', example: 'name' })
  @IsOptional()
  @IsString()
  sort?: string;

  // Field limiting
  @ApiPropertyOptional({
    description: 'Fields to include',
    example: 'name,location',
  })
  @IsOptional()
  @IsString()
  fields?: string;

  // Relations include (e.g., jobs, user)
  @ApiPropertyOptional({
    description: 'Relations to include',
    example: 'jobs,user',
  })
  @IsOptional()
  @IsString()
  include?: string;
}
