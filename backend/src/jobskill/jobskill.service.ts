/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateJobSkillDto } from './dto/updatejobskill.dto';
import { CreateJobSkillsDto } from './dto/createjobskill.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class JobskillService {
  constructor(
    private prisma: DatabaseService,
    private redis: RedisService,
  ) {}

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
    const cachedData = await this.redis.get(`jobskills:${jobId}`);
    if (cachedData) {
      return JSON.parse(cachedData) as Awaited<
        ReturnType<typeof this.prisma.jobSkill.findMany>
      >;
    }

    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    const skills = await this.prisma.jobSkill.findMany({
      where: { jobId },
    });

    await this.redis.set(`jobskills:${jobId}`, JSON.stringify(skills), 600);

    return skills;
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
    const cached = await this.redis.get('topSkills');
    if (cached) {
      return JSON.parse(cached) as {
        skill: string;
        demand: number;
        jobs: number;
      }[];
    }

    const skills = await this.prisma.jobSkill.groupBy({
      by: ['skill'],
      _count: { jobId: true },
      orderBy: { _count: { jobId: 'desc' } },
      take: 10, // top 10 skills
    });

    const result = skills.map((s) => ({
      skill: s.skill,
      demand: s._count.jobId,
      jobs: s._count.jobId,
    }));

    await this.redis.set('topSkills', JSON.stringify(result), 600);

    return result;
  }
}
