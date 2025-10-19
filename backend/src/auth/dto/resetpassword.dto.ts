/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { VerifyOtpDto } from './verifyotp.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto extends VerifyOtpDto {
  @ApiProperty({ description: 'New password', example: 'newStrongPassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Confirm new password',
    example: 'newStrongPassword123',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
