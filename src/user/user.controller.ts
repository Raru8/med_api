import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from './user.service';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post()
  async create(@Body() data: UserDto){
    return this.userService.create(data);
  }
}

@Controller('me')
export class ProfileController {
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async findMe(@Req() request: any){
    return request.user
  }
}