/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateJobSkillDto } from './dto/createjobskill.dto';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';

@Injectable()
export class JobskillService {
  constructor(private prisma: DatabaseService) {}

  async createJobSkills(createJobSkillDto: CreateJobSkillDto) {
    const job = await this.prisma.job.findUnique({
      where: { id: createJobSkillDto.jobId },
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return this.prisma.jobSkill.create({
      data: createJobSkillDto,
    });
  }

  async getJobSkills(jobId: number) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return this.prisma.jobSkill.findMany({
      where: { jobId },
    });
  }

  async updateJobSkills(skillId: number, updateJobSkillDto: UpdateJobSkillDto) {
    const skill = await this.prisma.jobSkill.findUnique({
      where: { id: skillId },
    });
    if (!skill) throw new NotFoundException('Skill not found');

    return this.prisma.jobSkill.update({
      where: { id: skillId },
      data: updateJobSkillDto,
    });
  }

  async deleteJobSkills(skillId: number) {
    const skill = await this.prisma.jobSkill.findUnique({
      where: { id: skillId },
    });
    if (!skill) throw new NotFoundException('Skill not found');

    return this.prisma.jobSkill.delete({ where: { id: skillId } });
  }
}
