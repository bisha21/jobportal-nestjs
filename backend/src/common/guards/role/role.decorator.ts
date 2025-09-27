import { SetMetadata } from '@nestjs/common';
export const ROLE_KEY = 'role';
export const Role = (...roles: string[]) => SetMetadata(ROLE_KEY, roles);

