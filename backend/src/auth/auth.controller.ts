/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { CreateLoginDto } from './dto/login.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { VerifyOtpDto } from './dto/verifyotp.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from 'src/common/guards/auth/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { GoogleAuthGuard } from 'src/common/guards/google/google.guard';
import { type Response } from 'express';
import { UpdateUserDto } from './dto/updateUserDto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user and get JWT token' })
  @ApiBody({ type: CreateLoginDto })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials.',
  })
  async login(@Body() createLoginDto: CreateLoginDto) {
    return await this.authService.login(createLoginDto);
  }

  @Post('forget-password')
  @ApiOperation({ summary: 'Request password reset OTP' })
  @ApiBody({ type: ForgetPasswordDto })
  @ApiResponse({ status: 200, description: 'OTP sent to user email.' })
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return await this.authService.handleForgetPassword(forgetPasswordDto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP sent to user email' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({ status: 200, description: 'OTP verified successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid OTP or expired.' })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return await this.authService.verifyOtp(verifyOtpDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using verified OTP' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset successfully.' })
  @ApiResponse({ status: 400, description: 'Reset failed. Invalid data.' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get logged-in user profile' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.' })
  async getProfile(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return await this.authService.getProfile(Number(userId));
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return await this.authService.updateProfile(Number(userId), updateUserDto);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() req: RequestWithUser, @Res() res: Response) {
    const userData = req.user;
    const jwtToken = userData?.token;

    const frontendUrl = `${process.env.FRONTEND_URL}/google/success?token=${jwtToken}&user=${encodeURIComponent(JSON.stringify(userData))}`;

    return res.redirect(frontendUrl);
  }
}
