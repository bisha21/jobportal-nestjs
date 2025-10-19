/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
    example: 'Software Development',
  })
  @IsString()
  @IsNotEmpty()
  categoryName: string;
}
