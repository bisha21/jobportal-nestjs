import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './createCategory.dto';
export class updateCategoryDto extends PartialType(CreateCategoryDto) {}
