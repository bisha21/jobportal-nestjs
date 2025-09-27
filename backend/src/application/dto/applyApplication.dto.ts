// src/application/dto/createApplication.dto.ts
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateApplicationDto {
  @IsOptional()
  @IsString()
  @IsUrl()
  resumeUrl?: string;
}
