/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateApplicationDto {
  @ApiPropertyOptional({
    description: 'URL to the applicant’s resume (optional)',
    example: 'https://example.com/resume.pdf',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  resumeUrl?: string;
}
