/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { JwtModule } from '@nestjs/jwt';
import JwtConstants from 'src/config/jwt.config';

@Module({
  imports:[
    JwtModule.register({
      secret:JwtConstants.secret,
      signOptions:{expiresIn:JwtConstants.expiresIn}
    }),
  ],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule {}
