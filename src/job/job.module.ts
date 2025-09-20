/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JwtModule } from '@nestjs/jwt';
import JwtConstants from 'src/config/jwt.config';
import { DatabaseModule } from 'src/database/database.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    CompanyModule,
    DatabaseModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiresIn },
    }),
  ],
  providers: [JobService],
  controllers: [JobController],
})
export class JobModule {}
