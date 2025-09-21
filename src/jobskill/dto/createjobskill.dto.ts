/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateJobSkillDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  skill: string;

  @IsInt()
  jobId: number;
}
