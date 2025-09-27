import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './createFavoriteJob.dto';
export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {}
