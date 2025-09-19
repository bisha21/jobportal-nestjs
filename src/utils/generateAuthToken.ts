// src/utils/jwt.util.ts
import { JwtService } from '@nestjs/jwt';
import JwtConstants from '../config/jwt.config';

export type TokenPayload = {
  userId: number;
  email: string;
  role?: string;
};

export const generateAuthToken = (
  jwtService: JwtService,
  payload: TokenPayload,
) => {
  return jwtService.sign(payload, {
    secret: JwtConstants.secret,
    expiresIn: JwtConstants.expiresIn,
  });
};
