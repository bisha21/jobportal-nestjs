/* eslint-disable prettier/prettier */
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}
