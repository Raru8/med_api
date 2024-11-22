import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PrismaService } from '../database/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      signOptions: {expiresIn: '24h'}
    })
  ],
  providers: [
    AuthenticationService,
    PrismaService,
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
