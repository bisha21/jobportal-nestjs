import { Module } from '@nestjs/common';
import { UserSkillService } from './userskill.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import JwtConstants from 'src/config/jwt.config';
import { UserSkillController } from './userskill.controller';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiresIn },
    }),
  ],
  providers: [UserSkillService],
  controllers: [UserSkillController],
})
export class UserskillModule {}
