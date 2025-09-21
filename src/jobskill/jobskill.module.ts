import { Module } from '@nestjs/common';
import { JobskillService } from './jobskill.service';
import { JobskillController } from './jobskill.controller';
import { JwtModule } from '@nestjs/jwt';
import JwtConstants from 'src/config/jwt.config';
import { DatabaseModule } from 'src/database/database.module';
import { JobModule } from 'src/job/job.module';

@Module({
  imports: [
    DatabaseModule,
    JobModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiresIn },
    }),
  ],
  providers: [JobskillService],
  controllers: [JobskillController],
})
export class JobskillModule {}
