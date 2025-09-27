/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JwtModule } from '@nestjs/jwt';
import JwtConstants from 'src/config/jwt.config';
import { DatabaseModule } from 'src/database/database.module';
import { CompanyModule } from 'src/company/company.module';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [
    CompanyModule,
    forwardRef(() => ApplicationModule),
    DatabaseModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiresIn },
    }),
  ],
  providers: [JobService],
  controllers: [JobController],
  exports: [JobService],
})
export class JobModule {}
