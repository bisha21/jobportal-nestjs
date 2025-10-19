/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { JobType } from '../../../generated/prisma';

export class CreateJobDto {
  @ApiProperty({ description: 'Title of the job', example: 'Frontend Developer' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Job description', example: 'Develop and maintain UI' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Position name', example: 'Senior Developer' })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiPropertyOptional({ description: 'Location of the job', example: 'Remote' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'Experience required', example: '2-3 years' })
  @IsNotEmpty()
  @IsString()
  experience: string;

  @ApiProperty({ description: 'Minimum salary', example: 30000 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  salaryMin: number;

  @ApiProperty({ description: 'Maximum salary', example: 50000 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  salaryMax: number;

  @ApiPropertyOptional({ description: 'Type of job', enum: JobType, example: JobType.FULLTIME })
  @IsOptional()
  @IsEnum(JobType)
  type?: JobType;

  @ApiPropertyOptional({ description: 'Application deadline', example: '2025-12-31T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiProperty({ description: 'Company ID for the job', example: 1 })
  @IsNotEmpty()
  @IsInt()
  companyId: number;

  @ApiProperty({ description: 'Category ID for the job', example: 2 })
  @IsNotEmpty()
  @IsInt()
  categoryId: number;
}
