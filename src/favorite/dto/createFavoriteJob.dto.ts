// create-favorite.dto.ts
import { IsInt } from 'class-validator';

export class CreateFavoriteDto {
  @IsInt()
  jobId: number;
}
