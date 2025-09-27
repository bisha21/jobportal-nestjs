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

@Controller('favorites')
@UseGuards(JwtAuthGuard) // ensure user is authenticated
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  // Add job to favorites
  @Post()
  async addFavorite(
    @Body() dto: CreateFavoriteDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id; // comes from JWT payload
    return this.favoriteService.addFavorite(dto, userId);
  }

  // Get all favorites of logged-in user
  @Get()
  async getFavorites(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.favoriteService.getFavorites(userId);
  }

  // Delete favorite by id
  @Delete(':id')
  async deleteFavorite(@Param('id', ParseIntPipe) id: number) {
    return this.favoriteService.deleteFavorite(id);
  }
}
