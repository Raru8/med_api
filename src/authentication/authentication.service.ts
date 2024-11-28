import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AuthenticationDto } from './authentication.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(private prisma: PrismaService,
              private jwt: JwtService,
              private configService: ConfigService
  ) { }

  async authLogin(data: AuthenticationDto){
    const user = await this.prisma.user.findUnique({
      where:{email:data.email}
    })

    if(!user){
      throw new UnauthorizedException('Invalid email')
    }

    const password = await bcrypt.compare(data.password, user.password)

    if(!password){
      throw new UnauthorizedException('Invalid password')
    }

    const token = await this.jwt.signAsync(
      {id: user.id, email: user.email},
      {
        secret: this.configService.get<string>('SECRET_JWT'),
      }
    )

    return{ token }
  }

  async validateToken(token: string){
    return this.jwt.verify(token,{
      secret: this.configService.get<string>('SECRET_JWT')
    })
  }
}
