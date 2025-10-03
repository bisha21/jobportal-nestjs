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
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateJobSkillsDto } from './dto/createjobskill.dto';

@ApiTags('Job Skills')
@Controller('jobskills')
export class JobskillController {
  constructor(private readonly jobskillService: JobskillService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job skill' })
  @ApiBody({ type: CreateJobSkillsDto })
  @ApiResponse({ status: 201, description: 'Job skill created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  async createJobSkill(@Body() dto: CreateJobSkillsDto) {
    return await this.jobskillService.createJobSkills(dto);
  }
  @Get(':jobId')
  @ApiOperation({ summary: 'Get all skills for a specific job' })
  @ApiParam({ name: 'jobId', type: Number, description: 'ID of the job' })
  @ApiResponse({ status: 200, description: 'List of job skills returned' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async getJobSkills(@Param('jobId', ParseIntPipe) jobId: number) {
    return this.jobskillService.getJobSkills(jobId);
  }

  @Patch(':skillId')
  @ApiOperation({ summary: 'Update an existing job skill' })
  @ApiParam({ name: 'skillId', type: Number, description: 'ID of the skill' })
  @ApiBody({ type: UpdateJobSkillDto })
  @ApiResponse({ status: 200, description: 'Job skill updated successfully' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  async updateJobSkill(
    @Param('skillId', ParseIntPipe) skillId: number,
    @Body() updateJobSkillDto: UpdateJobSkillDto,
  ) {
    return this.jobskillService.updateJobSkills(skillId, updateJobSkillDto);
  }

  @Delete(':skillId')
  @ApiOperation({ summary: 'Delete a job skill' })
  @ApiParam({ name: 'skillId', type: Number, description: 'ID of the skill' })
  @ApiResponse({ status: 200, description: 'Job skill deleted successfully' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  async deleteJobSkill(@Param('skillId', ParseIntPipe) skillId: number) {
    return this.jobskillService.deleteJobSkills(skillId);
  }
}
