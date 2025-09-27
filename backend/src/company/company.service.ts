/* eslint-disable prettier/prettier */
import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCompanyDto } from './dto/createDto';
import { UpdateCompanyDto } from './dto/updateDto';
import { Company } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private prisma: DatabaseService) {}
  private validateOwnership(company: Company, ownerId: number) {
    if (company.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this company');
    }
  }

  // Create a company
  async createCompany(createCompanyDto: CreateCompanyDto, ownerId: number) {
    try {
      // Check if company already exists
      const existing = await this.prisma.company.findFirst({
        where: { name: createCompanyDto.name },
      });

      if (existing) {
        throw new ConflictException('Company with this name already exists');
      }

      return await this.prisma.company.create({
        data: {
          ...createCompanyDto,
          user: { connect: { id: ownerId } },
        },
      });
    } catch (error) {
      console.error('createCompany error:', error);

      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Failed to create company');
    }
  }

  // Get all companies
  async getAllCompanies() {
    try {
      return await this.prisma.company.findMany();
    } catch (error) {
      console.error('getAllCompanies error:', error);
      throw new InternalServerErrorException('Failed to fetch companies');
    }
  }

  // Get a company by ID
  async getCompanyById(companyId: number) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id: companyId },
      });
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      return company;
    } catch (error) {
      console.error('getCompanyById error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch company');
    }
  }

  async deleteComapnyId(companyId: number, ownerId: number) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id: companyId },
      });
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      this.validateOwnership(company, ownerId);

      return await this.prisma.company.delete({
        where: { id: companyId },
      });
    } catch (error) {
      console.error('deleteComapnyId error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete company');
    }
  }
  async updateCompany(
    companyId: number,
    updateCompanyDto: UpdateCompanyDto,
    ownerId: number, // pass the current logged-in user's ID
  ) {
    try {
      // Find the company first
      const company = await this.prisma.company.findUnique({
        where: { id: companyId },
      });

      if (!company) {
        throw new NotFoundException('Company not found');
      }

      // Check if the logged-in user is the owner
      this.validateOwnership(company, ownerId);
      // Update the company
      return await this.prisma.company.update({
        where: { id: companyId },
        data: updateCompanyDto,
      });
    } catch (error) {
      console.error('updateCompany error:', error);

      // Re-throw known exceptions
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }

      // Unknown errors
      throw new InternalServerErrorException('Failed to update company');
    }
  }
  async updateCompanyLogo(companyId: number, logoUrl: string) {
    try {
      return await this.prisma.company.update({
        where: { id: companyId },
        data: { logoUrl: logoUrl },
      });
    } catch (error) {
      console.error('updateCompanyLogo error:', error);
      throw new InternalServerErrorException('Failed to update company logo');
    }
  }
}
