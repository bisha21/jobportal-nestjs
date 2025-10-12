/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchApplicationDto {
  // Filter by job title
  @IsOptional()
  @IsString()
  title?: string;

  // Filter by company owner
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  ownerId?: number;

  // Filter by user ID (applicant)
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number;

  // Filter by job ID
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  jobId?: number;

  // Filter by company ID
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  companyId?: number;

  // Pagination
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  // Sorting
  @IsOptional()
  @IsString()
  sort?: string;

  // Field limiting
  @IsOptional()
  @IsString()
  fields?: string;

  // Relations include
  @IsOptional()
  @IsString()
  include?: string;
}
