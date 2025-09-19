import { Controller, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  @UseGuards(JwtAuth)
}
