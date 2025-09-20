import { forwardRef, Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import JwtConstants from 'src/config/jwt.config';
import { JobModule } from 'src/job/job.module';

@Module({
  imports: [
    forwardRef(() => JobModule),
    DatabaseModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiresIn },
    }),
  ],
  providers: [ApplicationService],
  controllers: [ApplicationController],
  exports: [ApplicationService],
})
export class ApplicationModule {}
