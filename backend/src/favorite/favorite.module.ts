import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JobModule } from 'src/job/job.module';
import { JwtModule } from '@nestjs/jwt';
import JwtConstants from 'src/config/jwt.config';

@Module({
  imports: [
    DatabaseModule,
    JobModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiresIn },
    }),
  ],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
