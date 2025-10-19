/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty} from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({ description: 'Email address for OTP verification', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'OTP code sent to email', example: 123456 })
  @IsInt()
  otp: number;
}