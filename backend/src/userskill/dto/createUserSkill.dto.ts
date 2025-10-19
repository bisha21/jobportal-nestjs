/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSkillDto {
  @ApiProperty({ description: 'Name of the skill', example: 'JavaScript' })
  @IsString()
  @IsNotEmpty()
  skill: string;
}
