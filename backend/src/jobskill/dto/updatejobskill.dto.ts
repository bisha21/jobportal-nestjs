import { PartialType } from '@nestjs/mapped-types';
import { CreateJobSkillsDto } from './createjobskill.dto';
export class UpdateJobSkillDto extends PartialType(CreateJobSkillsDto) {}
