import { PartialType } from '@nestjs/mapped-types';
import { CreateJobSkillDto } from './createjobskill.dto';
export class UpdateJobSkillDto extends PartialType(CreateJobSkillDto) {}
