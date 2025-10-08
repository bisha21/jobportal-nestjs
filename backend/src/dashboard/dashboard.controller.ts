/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/common/guards/auth/auth.guard';
import { RoleGuard } from 'src/common/guards/role/role.guard';
import { Role as Roles } from 'src/common/guards/role/role.decorator';
import { Role } from 'src/common/guards/role/role.enum';

@ApiTags('Dashboard') // Group in Swagger UI
@ApiBearerAuth() // Shows Authorization header in Swagger
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @ApiOperation({
    summary: 'Get dashboard data',
    description:
      'Retrieve aggregated dashboard metrics for admin and employee roles',
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard data retrieved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. You do not have access to this resource',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  getDashboardData() {
    return this.dashboardService.getDashboardData();
  }
}
