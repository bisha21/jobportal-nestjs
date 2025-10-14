/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { DatabaseService } from 'src/database/database.service';
import { CreateLoginDto } from './dto/login.dto';
import { comparePassword } from 'src/utils/hashpassword';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';

// Mock Prisma service (DatabaseService)
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findFirst: jest.fn(),
  },
};

// Mock JwtService
const mockJwtService = {
  sign: jest.fn(() => 'mockedToken'),
};

// Mock MailService
const mockMailService = {
  sendMail: jest.fn(),
};

// Mock helper functions
jest.mock('src/utils/hashpassword', () => ({
  hashPassword: jest.fn(() => 'hashedPass'),
  comparePassword: jest.fn((a, b) => a === b),
}));

jest.mock('src/utils/generateAuthToken', () => ({
  generateAuthToken: jest.fn(() => 'mockedToken'),
}));

jest.mock('src/utils/generateOtp', () => jest.fn(() => '123456'));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: DatabaseService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwtService },
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a new user', async () => {
    // Mock: no existing user
    mockPrisma.user.findUnique.mockResolvedValue(null);

    // Mock: created user
    mockPrisma.user.create.mockResolvedValue({
      id: 1,
      fullName: 'test testing',
      email: 'test@gmail.com',
      profile: 'test1111',
      password: 'hashedPass',
      phoneNumber: '987654321',
      bio: 'bio',
      role: 'USER',
    });

    const newUser: CreateUserDto = {
      fullName: 'test testing',
      email: 'test@gmail.com',
      profile: 'test1111',
      password: 'test123',
      phoneNumber: '987654321',
      bio: 'bio',
    };

    const result = await service.registerUser(newUser);

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@gmail.com' },
    });
    expect(mockPrisma.user.create).toHaveBeenCalled();
    expect(result).toHaveProperty('token', 'mockedToken');
    expect(result.user).toHaveProperty('email', 'test@gmail.com');
  });

  it('should throw ConflictException if email already exists', async () => {
    // Mock: existing user
    mockPrisma.user.findUnique.mockResolvedValue({ id: 1 });

    const existingUser: CreateUserDto = {
      fullName: 'Test User',
      email: 'test@example.com',
      password: '1234',
      profile: 'profile',
      phoneNumber: '1234567890',
      bio: 'bio',
    };

    await expect(service.registerUser(existingUser)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should login a user successfully and return a token', async () => {
    const user = {
      id: 1,
      fullName: 'test testing',
      email: 'test@gmail.com',
      profile: 'test123',
      password: 'hashedPass',
      phoneNumber: '987654321',
      bio: 'bio',
      role: 'USER',
    };

    mockPrisma.user.findUnique.mockResolvedValue(user);

    const loginDto: CreateLoginDto = {
      email: 'test@gmail.com',
      password: 'test123',
    };

    // Correctly mock async comparePassword
    (comparePassword as jest.Mock).mockResolvedValue(true);

    const result = await service.login(loginDto);

    expect(result.token).toBe('mockedToken');
    expect(result.user.email).toBe('test@gmail.com');
  });

  it('should handle if email does not exist', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    const loginDto: CreateLoginDto = {
      email: 'notexisting@gmail.com',
      password: 'test123',
    };

    await expect(service.login(loginDto)).rejects.toThrow(NotFoundException);
    await expect(service.login(loginDto)).rejects.toThrow('User not found ');

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'notexisting@gmail.com' },
    });
  });

  it('should handle if password is incorrect', async () => {
    const user = {
      id: 1,
      fullName: 'test testing',
      email: 'test@gmail.com',
      profile: 'test123',
      password: 'hashedPass',
      phoneNumber: '987654321',
      bio: 'bio',
      role: 'USER',
    };

    mockPrisma.user.findUnique.mockResolvedValue(user);

    const loginDto: CreateLoginDto = {
      email: 'test@gmail.com',
      password: 'wrongPassword',
    };

    // Incorrectly mock async comparePassword
    (comparePassword as jest.Mock).mockResolvedValue(false);

    await expect(service.login(loginDto)).rejects.toThrow(NotFoundException);
    await expect(service.login(loginDto)).rejects.toThrow(
      'Invalid Email or password',
    );
  });
  it('should send OTP if email exists', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 1,
      fullName: 'Test User',
      email: 'test@gmail.com',
    });

    mockPrisma.user.update.mockResolvedValue({
      id: 1,
      otp: '123456',
      otpExpiry: new Date(),
    });

    const result = await service.handleForgetPassword({
      email: 'test@gmail.com',
    });

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@gmail.com' },
    });

    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { email: 'test@gmail.com' },
      data: { otp: '123456', otpExpiry: expect.any(Date) },
    });

    expect(mockMailService.sendMail).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      subject: 'Password Reset OTP',
      html: expect.stringContaining('123456'),
      message: expect.stringContaining('123456'),
    });

    expect(result).toEqual({ message: 'OTP sent to your email address' });
  });

  it('should verify otp successfully', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 1,
      fullName: 'Test User',
      email: 'test@gmail.com',
      otp: 123456,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000), 
    });

    mockPrisma.user.update.mockResolvedValue({});

    const result = await service.verifyOtp({
      email: 'test@gmail.com',
      otp: 123456,
    });

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@gmail.com' },
    });

    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { email: 'test@gmail.com' },
      data: { otp: null, otpExpiry: null },
    });

    expect(result).toEqual({ message: 'OTP verified successfully' });
  });

  it('should reset password successfully', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'test@gmail.com',
      otp: 123456,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000), // 5 min in future
    });

    mockPrisma.user.update.mockResolvedValue({});

    const result = await service.resetPassword({
      email: 'test@gmail.com',
      otp: 123456,
      password: 'newPassword',
      confirmPassword: 'newPassword',
    });

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@gmail.com' },
    });

    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { email: 'test@gmail.com' },
      data: { password: 'hashedPass', otp: null, otpExpiry: null }, // hashed
    });

    expect(result).toEqual({ message: 'Password reset successfully' });
  });
});
