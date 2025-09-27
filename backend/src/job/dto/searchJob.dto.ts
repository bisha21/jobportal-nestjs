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
