/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/createFavoriteJob.dto';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from 'src/common/guards/auth/auth.guard';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Favorites')
@ApiBearerAuth() // Requires JWT auth
@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  /**
   * Add job to favorites
   */
  @Post()
  @ApiOperation({ summary: 'Add a job to favorites' })
  @ApiBody({ type: CreateFavoriteDto })
  @ApiResponse({
    status: 201,
    description: 'Job successfully added to favorites',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: No token provided or invalid token',
  })
  async addFavorite(
    @Body() dto: CreateFavoriteDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return this.favoriteService.addFavorite(dto, userId);
  }

  /**
   * Get all favorites of logged-in user
   */
  @Get()
  @ApiOperation({ summary: 'Get all favorite jobs for logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of favorite jobs',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: No token provided or invalid token',
  })
  async getFavorites(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.favoriteService.getFavorites(userId);
  }

  /**
   * Delete favorite job by id
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a favorite job by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the favorite job to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Favorite job successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Favorite job not found',
  })
  async deleteFavorite(@Param('id', ParseIntPipe) id: number) {
    return this.favoriteService.deleteFavorite(id);
  }
}
