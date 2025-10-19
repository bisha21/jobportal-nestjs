/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'ID of the user to receive the notification',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Type of notification', example: 'INFO' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Notification message content',
    example: 'Your job application has been approved.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
