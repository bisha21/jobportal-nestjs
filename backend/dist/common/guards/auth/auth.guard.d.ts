import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { Request } from 'express';
import { User } from 'generated/prisma';
export interface RequestWithUser extends Request {
    user: User;
}
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly prisma;
    constructor(jwtService: JwtService, prisma: DatabaseService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
