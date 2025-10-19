/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'ID of the job to mark as favorite',
    example: 123,
  })
  @IsInt()
  jobId: number;
}
