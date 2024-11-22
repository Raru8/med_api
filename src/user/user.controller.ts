import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post()
  async create(@Body() data: UserDto){
    return this.userService.create(data);
  }

  @Get(':id')
  async findUnique(@Param('id') id: number){
    return this.userService.findUnique(Number(id));
  }
}