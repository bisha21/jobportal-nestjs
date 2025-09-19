import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './createDto';
export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {};