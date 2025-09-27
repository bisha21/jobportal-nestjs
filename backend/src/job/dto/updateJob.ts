import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './createJob';
export class updateJobDto extends PartialType(CreateJobDto) {}
