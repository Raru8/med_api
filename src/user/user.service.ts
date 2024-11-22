import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async create(data: UserDto) {
    const hash = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hash,
      },
    });
  }

  async findUnique(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
