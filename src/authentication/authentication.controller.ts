import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDto } from './authentication.dto';

@Controller('login')
export class AuthenticationController {
  constructor(private readonly authentication: AuthenticationService) {}

  @Post()
  @HttpCode(200)
  async login(@Body() data: AuthenticationDto){
    return this.authentication.authLogin(data)
  }

}
