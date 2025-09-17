import { IsNotEmpty, IsString } from 'class-validator';
import { VerifyOtpDto } from './verifyotp.dto';

export class ResetPasswordDto extends VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
