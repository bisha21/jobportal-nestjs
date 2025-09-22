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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserSkillService } from './userskill.service';
import { CreateUserSkillDto } from './dto/createUserSkill.dto';
import { UpdateUserSkillDto } from './dto/updateUserSkill.dto';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from 'src/common/guards/auth/auth.guard';

@ApiTags('User Skills')
@ApiBearerAuth() // Adds "lock" button for JWT token in Swagger UI
@Controller('userskills')
export class UserSkillController {
  constructor(private readonly userSkillService: UserSkillService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new skill for the authenticated user' })
  @ApiResponse({ status: 201, description: 'Skill created successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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
  @ApiOperation({ summary: 'Get all skills of the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of user skills returned.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserSkills(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.userSkillService.getUserSkills(userId);
  }

  @Put(':skillId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a specific skill by skillId' })
  @ApiResponse({ status: 200, description: 'Skill updated successfully.' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateUserSkill(
    @Param('skillId', ParseIntPipe) skillId: number,
    @Body() updateUserSkillDto: UpdateUserSkillDto,
  ) {
    return this.userSkillService.updateUserSkill(skillId, updateUserSkillDto);
  }

  @Delete(':skillId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a specific skill by skillId' })
  @ApiResponse({ status: 200, description: 'Skill deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteUserSkill(@Param('skillId', ParseIntPipe) skillId: number) {
    return this.userSkillService.deleteUserSkill(skillId);
  }
}
