import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import JwtConstants from 'src/config/jwt.config';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiresIn },
    }),
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
