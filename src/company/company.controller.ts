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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Company')
@ApiBearerAuth() // JWT auth for Swagger
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // Create a company
  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @ApiOperation({ summary: 'Create a new company' })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({ status: 201, description: 'Company successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient role.' })
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return await this.companyService.createCompany(createCompanyDto, userId);
  }

  // Get all companies
  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'List of all companies.' })
  async getAllCompanies() {
    return await this.companyService.getAllCompanies();
  }

  // Get company by ID
  @Get(':companyId')
  @ApiOperation({ summary: 'Get company by ID' })
  @ApiParam({
    name: 'companyId',
    description: 'ID of the company',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'Company found.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  async getCompanyById(@Param('companyId', ParseIntPipe) companyId: number) {
    return await this.companyService.getCompanyById(companyId);
  }

  // Update a company
  @Patch(':companyId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.EMPLOYEE, Role.ADMIN)
  @ApiOperation({ summary: 'Update company details' })
  @ApiParam({
    name: 'companyId',
    description: 'ID of the company to update',
    type: Number,
  })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({ status: 200, description: 'Company successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient role.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
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
  @ApiOperation({ summary: 'Delete a company' })
  @ApiParam({
    name: 'companyId',
    description: 'ID of the company to delete',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'Company successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient role.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  async deleteCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return await this.companyService.deleteComapnyId(companyId, userId);
  }
}
