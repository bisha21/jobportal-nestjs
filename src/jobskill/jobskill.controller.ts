/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { JobskillService } from './jobskill.service';
import { CreateJobSkillDto } from './dto/createjobskill.dto';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';

@Controller('jobskills')
export class JobskillController {
  constructor(private readonly jobskillService: JobskillService) {}

  // Create job skill
  @Post()
  async createJobSkill(@Body() createJobSkillDto: CreateJobSkillDto) {
    return this.jobskillService.createJobSkills(createJobSkillDto);
  }

  // Get all skills for a specific job
  @Get(':jobId')
  async getJobSkills(@Param('jobId', ParseIntPipe) jobId: number) {
    return this.jobskillService.getJobSkills(jobId);
  }

  // Update a skill
  @Patch(':skillId')
  async updateJobSkill(
    @Param('skillId', ParseIntPipe) skillId: number,
    @Body() updateJobSkillDto: UpdateJobSkillDto,
  ) {
    return this.jobskillService.updateJobSkills(skillId, updateJobSkillDto);
  }

  // Delete a skill
  @Delete(':skillId')
  async deleteJobSkill(@Param('skillId', ParseIntPipe) skillId: number) {
    return this.jobskillService.deleteJobSkills(skillId);
  }
}
