/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserSkillDto } from './dto/createUserSkill.dto';
import { UpdateUserSkillDto } from './dto/updateUserSkill.dto';

@Injectable()
export class UserSkillService {
  constructor(private readonly prisma: DatabaseService) {}

  async createUserSkill(
    userId: number,
    createUserSkillDto: CreateUserSkillDto,
  ) {
    // Prisma will automatically throw if userId is invalid (FK violation)
    return this.prisma.userSkill.create({
      data: {
        userId,
        ...createUserSkillDto,
      },
      include: { user: true },
    });
  }

  async getUserSkills(userId: number) {
    return this.prisma.userSkill.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateUserSkill(
    skillId: number,
    updateUserSkillDto: UpdateUserSkillDto,
  ) {
    const skill = await this.prisma.userSkill.findUnique({
      where: { id: skillId },
    });
    if (!skill)
      throw new NotFoundException(`Skill with ID ${skillId} not found`);

    return this.prisma.userSkill.update({
      where: { id: skillId },
      data: updateUserSkillDto,
    });
  }

  async deleteUserSkill(skillId: number) {
    const skill = await this.prisma.userSkill.findUnique({
      where: { id: skillId },
    });
    if (!skill)
      throw new NotFoundException(`Skill with ID ${skillId} not found`);

    return this.prisma.userSkill.delete({ where: { id: skillId } });
  }
}
