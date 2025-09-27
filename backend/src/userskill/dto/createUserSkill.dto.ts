/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsString } from 'class-validator';

export class CreateUserSkillDto {
  @IsString()
  @IsNotEmpty()
  skill: string;
}
