/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name', example: 'Tech Solutions' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the company',
    example: 'We build software',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Location of the company',
    example: 'Kathmandu, Nepal',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiPropertyOptional({
    description: 'Company website',
    example: 'https://techsolutions.com',
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({
    description: 'Industry of the company',
    example: 'Software Development',
  })
  @IsString()
  @IsNotEmpty()
  industry: string;

  @ApiProperty({
    description: 'Size of the company',
    example: '50-100 employees',
  })
  @IsString()
  @IsNotEmpty()
  companySize: string;

  @ApiPropertyOptional({
    description: 'Logo URL',
    example: 'https://techsolutions.com/logo.png',
  })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional({
    description: 'Created at timestamp',
    example: new Date().toISOString(),
  })
  @IsOptional()
  @IsDateString()
  createdAt?: string = new Date().toISOString();
}
