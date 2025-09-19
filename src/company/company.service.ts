/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCompanyDto } from './dto/createDto';

@Injectable()
export class CompanyService {
  constructor(private prisma: DatabaseService) {}
  async createCompany(createCompanyDto: CreateCompanyDto, ownerId: number) {
    return await this.prisma.company.create({ data: {
        ...createCompanyDto,
        ownerId: ownerId
      }
        
     });
  }
}

