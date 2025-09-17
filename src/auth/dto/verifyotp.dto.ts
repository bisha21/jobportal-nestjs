import { IsEmail, IsInt, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsInt()
  otp: number;
}
