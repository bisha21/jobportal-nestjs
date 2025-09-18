/* eslint-disable prettier/prettier */
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/register.dto';
import { comparePassword, hashPassword } from 'src/utils/hashpassword';
import { generateAuthToken } from 'src/utils/generateAuthToken';
import { JwtService } from '@nestjs/jwt';
import { CreateLoginDto } from './dto/login.dto';
import generateOtp from 'src/utils/generateOtp';
import { MailService } from 'src/mail/mail.service';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { VerifyOtpDto } from './dto/verifyotp.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: DatabaseService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash the password
    const hashedPassword = await hashPassword(createUserDto.password);

    // Create the user
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = generateAuthToken(this.jwtService, {
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Remove password before returning
    const { password, ...userData } = user;

    return {
      user: userData,
      token,
    };
  }

  async login(createLoginDto: CreateLoginDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: createLoginDto.email },
    });
    if (!userExists) {
      throw new NotFoundException('User not found ');
    }
    const isPasswordMatch = await comparePassword(
      createLoginDto.password,
      userExists.password,
    );
    if (!isPasswordMatch) {
      throw new NotFoundException('Invalid Email or password');
    }
    const token = generateAuthToken(this.jwtService, {
      userId: userExists.id,
      email: userExists.email,
      role: userExists.role,
    });
    const { password, ...userData } = userExists;
    return {
      user: userData,
      token,
    };
  }

  async handleForgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const { email } = forgetPasswordDto;
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    // generate OTP and expiry
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    // save OTP in DB
    await this.prisma.user.update({
      where: { email },
      data: { otp, otpExpiry },
    });

    // send email with OTP
    await this.mailService.sendMail({
      email,
      subject: 'Password Reset OTP',
      html: `<p>Hello ${userExists.fullName},</p>
           <p>Your OTP for password reset is: <b>${otp}</b></p>
           <p>This OTP is valid for 5 minutes.</p>`,
      message: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
    });

    return { message: 'OTP sent to your email address' };
  }
  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { email, otp } = verifyOtpDto;
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    if (userExists.otp !== otp) {
      throw new NotFoundException('Invalid OTP');
    }

    // If otpExpiry is stored as a number
    if (!userExists.otpExpiry || userExists.otpExpiry.getTime() < Date.now()) {
      throw new NotFoundException('OTP expired');
    }

    return { message: 'OTP verified successfully' };
  }

  async resetPassword(ressetPasswordDto: ResetPasswordDto) {
    const { password, confirmPassword, email, otp } = ressetPasswordDto;

    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    if (userExists.otp !== otp) {
      throw new NotFoundException('Invalid OTP');
    }

    // If otpExpiry is stored as a number
    if (!userExists.otpExpiry || userExists.otpExpiry.getTime() < Date.now()) {
      throw new NotFoundException('OTP expired');
    }
    if (password !== confirmPassword) {
      throw new NotFoundException('Password and confirm password not matched');
    }
    const hashedPassword = await hashPassword(password);
    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword, otp: null, otpExpiry: null },
    });
    return { message: 'Password reset successfully' };
  }

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
