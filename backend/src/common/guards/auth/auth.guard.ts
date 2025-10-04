/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { Request } from 'express';
import { User } from 'generated/prisma';
import { TokenPayload } from 'src/utils/generateAuthToken';

interface IUser extends User {
  token?: string;
}

export interface RequestWithUser extends Request {
  user: IUser; // define the type of user
  token?: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: DatabaseService, // access your DB
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'] as string;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized: No token provided');
    }

    try {
      // Verify token
      const decoded = this.jwtService.verify<TokenPayload>(token);

      // Fetch user from DB
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new UnauthorizedException('Unauthorized: User not found');
      }
      console.log(user);

      // Attach user to request object
      request['user'] = user;

      return true;
    } catch (err) {
      console.error(err.message);
      throw new UnauthorizedException('Unauthorized: Invalid token');
    }
  }
}
