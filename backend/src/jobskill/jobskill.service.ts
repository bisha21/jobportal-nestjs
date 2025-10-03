/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';
import { CreateJobSkillsDto } from './dto/createjobskill.dto';

@Injectable()
export class JobskillService {
  constructor(private prisma: DatabaseService) {}

  async createJobSkills(dto: CreateJobSkillsDto) {
    const job = await this.prisma.job.findUnique({
      where: { id: dto.jobId },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    const skillData = dto.skills.map((skill) => ({
      jobId: dto.jobId,
      skill,
    }));

    await this.prisma.jobSkill.createMany({
      data: skillData,
      skipDuplicates: true,
    });

    return this.prisma.job.findUnique({
      where: { id: dto.jobId },
      include: { jobSkills: true },
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
