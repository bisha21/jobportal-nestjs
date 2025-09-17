/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { CreateLoginDto } from './dto/login.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { VerifyOtpDto } from './dto/verifyotp.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  async Login(@Body() createLoginDto: CreateLoginDto) {
    return await this.authService.login(createLoginDto);
  }
  @Post('forget-password')
async ForgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
  return await this.authService.handleForgetPassword(forgetPasswordDto);
}

@Post('verify-otp')
async VerifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
  return await this.authService.verifyOtp(verifyOtpDto);
}
@Post('reset-password')
async ResetPassword(@Body() resetPasswordDto:ResetPasswordDto)
{
  return await this.authService.resetPassword(resetPasswordDto);
}
}
