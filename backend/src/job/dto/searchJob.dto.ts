/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchJobDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  jobType?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  companyId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  categoryId?: number;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  salaryMin?: number;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  salaryMax?: number;

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
