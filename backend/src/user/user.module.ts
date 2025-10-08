/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
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
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
