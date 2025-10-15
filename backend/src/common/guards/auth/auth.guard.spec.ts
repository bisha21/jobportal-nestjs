/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { DatabaseService } from 'src/database/database.service';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let jwtService: JwtService;
  let prisma: DatabaseService;

  const mockJwtService = {
    verify: jest.fn(),
  };

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        { provide: JwtService, useValue: mockJwtService },
        { provide: DatabaseService, useValue: mockPrisma },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    jwtService = module.get<JwtService>(JwtService);
    prisma = module.get<DatabaseService>(DatabaseService);

    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // suppress logs
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    const context: any = {
      switchToHttp: () => ({ getRequest: () => ({ headers: {} }) }),
    };

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer invalid' } }),
      }),
    };
    mockJwtService.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if user not found', async () => {
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer valid' } }),
      }),
    };
    mockJwtService.verify.mockReturnValue({ userId: 999 });
    mockPrisma.user.findUnique.mockResolvedValue(null);

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should return true and attach user if token and user are valid', async () => {
    const user = { id: 1, name: 'Bishal' };
    const request: any = { headers: { authorization: 'Bearer valid' } };

    const context: any = {
      switchToHttp: () => ({ getRequest: () => request }),
    };

    mockJwtService.verify.mockReturnValue({ userId: 1 });
    mockPrisma.user.findUnique.mockResolvedValue(user);

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(request.user).toEqual(user);
    expect(mockJwtService.verify).toHaveBeenCalledWith('valid');
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
