/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserSkillService } from './userskill.service';
import { CreateUserSkillDto } from './dto/createUserSkill.dto';
import { UpdateUserSkillDto } from './dto/updateUserSkill.dto';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from 'src/common/guards/auth/auth.guard';

@Controller('userskills')
export class UserSkillController {
  constructor(private readonly userSkillService: UserSkillService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUserSkill(
    @Body() createUserSkillDto: CreateUserSkillDto,
    @Req() req: RequestWithUser,
  ) {
    return this.userSkillService.createUserSkill(
      req.user.id,
      createUserSkillDto,
    );
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getUserSkills(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.userSkillService.getUserSkills(userId);
  }

  @Put(':skillId')
  @UseGuards(JwtAuthGuard)
  async updateUserSkill(
    @Param('skillId', ParseIntPipe) skillId: number,
    @Body() updateUserSkillDto: UpdateUserSkillDto,
  ) {
    return this.userSkillService.updateUserSkill(skillId, updateUserSkillDto);
  }

  @Delete(':skillId')
  @UseGuards(JwtAuthGuard)
  async deleteUserSkill(@Param('skillId', ParseIntPipe) skillId: number) {
    return this.userSkillService.deleteUserSkill(skillId);
  }
}
