import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './applyApplication.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApplicationStatus } from 'generated/prisma';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}
