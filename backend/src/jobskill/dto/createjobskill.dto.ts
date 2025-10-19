/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobSkillsDto {
  @ApiProperty({ description: 'ID of the job', example: 1 })
  @IsInt()
  jobId: number;

  @ApiProperty({
    description: 'Skill for the job',
    example: 'JavaScript',
    minLength: 2,
  })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @MinLength(2, { each: true })
  skill: string;
}
