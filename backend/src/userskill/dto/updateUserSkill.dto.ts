import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSkillDto } from './createUserSkill.dto';

export class UpdateUserSkillDto extends PartialType(CreateUserSkillDto) {}
