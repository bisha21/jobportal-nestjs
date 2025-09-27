import { JwtService } from '@nestjs/jwt';
export type TokenPayload = {
    userId: number;
    email: string;
    role?: string;
};
export declare const generateAuthToken: (jwtService: JwtService, payload: TokenPayload) => string;
