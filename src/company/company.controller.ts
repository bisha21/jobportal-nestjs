/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  JwtAuthGuard,
  type RequestWithUser,
} from 'src/common/guards/auth/auth.guard';
import { CreateCompanyDto } from './dto/createDto';
import { UpdateCompanyDto } from './dto/updateDto';
import { RoleGuard } from 'src/common/guards/role/role.guard';
import { Role } from 'src/common/guards/role/role.enum';
import { Role as Roles } from 'src/common/guards/role/role.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // Create a company
  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    console.log('Incoming body:', createCompanyDto);
    return await this.companyService.createCompany(createCompanyDto, userId);
  }

  // Get all companies
  @Get()
  async getAllCompanies() {
    return await this.companyService.getAllCompanies();
  }

  // Get company by ID
  @Get(':companyId')
  async getCompanyById(@Param('companyId', ParseIntPipe) companyId: number) {
    return await this.companyService.getCompanyById(companyId);
  }

  // Update a company
  @Patch(':companyId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.EMPLOYEE, Role.ADMIN)
  async updateCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return await this.companyService.updateCompany(
      companyId,
      updateCompanyDto,
      userId,
    );
  }

  // Delete a company
  @Delete(':companyId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.JOBSEEKER)
  async deleteCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return await this.companyService.deleteComapnyId(companyId, userId);
  }
}
