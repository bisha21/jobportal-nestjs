import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './register.dto';
export class UpdateUserDto extends PartialType(CreateUserDto) {}
