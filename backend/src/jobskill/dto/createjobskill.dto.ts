/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateJobSkillsDto {
  @IsInt()
  jobId: number;

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @MinLength(2, { each: true })
  skills: string[];
}
