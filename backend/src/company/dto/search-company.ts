/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class SearchCompanyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsString()
  companySize?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  ownerId?: number;

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

  // Relations include (e.g., jobs, user)
  @IsOptional()
  @IsString()
  include?: string;
}
