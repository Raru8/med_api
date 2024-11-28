import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtAuthenticationGuard implements CanActivate {

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const {authorization} : any = request.headers;

      if(!authorization || authorization.trim() === ''){
        throw new UnauthorizedException('Pleaser provide token');
      }

      const authToken = authorization.replace('Bearer ', '').trim();
      request.decodedData = await this.authenticationService.validateToken(authToken);

      const id = parseInt(request.decodedData.id)
      request.user = this.userService.findProfile(id);

      return true
    }catch (error) {
      console.log('auth error - ', error.message);
      throw new ForbiddenException(error.message || 'session expired! Please sign In')
    }
  }
}