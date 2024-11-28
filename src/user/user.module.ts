import { Module } from '@nestjs/common';
import { ProfileController, UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from '../authentication/authentication.service';

@Module({
  controllers: [
    UserController,
    ProfileController,
  ],
  providers: [
    AuthenticationService,
    JwtService,
    UserService,
    PrismaService
  ]
})
export class UserModule {}
