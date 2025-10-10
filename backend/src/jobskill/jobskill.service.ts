/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';
import { CreateJobSkillsDto } from './dto/createjobskill.dto';

@Injectable()
export class JobskillService {
  constructor(private prisma: DatabaseService) {}

  async createJobSkill(dto: CreateJobSkillsDto) {
    const job = await this.prisma.job.findUnique({
      where: { id: dto.jobId },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    const skillData = {
      jobId: dto.jobId,
      skill: dto.skill,
    };

    await this.prisma.jobSkill.create({
      data: skillData,
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

  async topSkills() {
    const skills = await this.prisma.jobSkill.groupBy({
      by: ['skill'],
      _count: {
        jobId: true,
      },
      orderBy: {
        _count: {
          jobId: 'desc',
        },
      },
      take: 10, // top 10 skills
    });

    return skills.map((s) => ({
      skill: s.skill,
      demand: s._count.jobId, // how many jobs require this skill
      jobs: s._count.jobId,
    }));
  }
}
