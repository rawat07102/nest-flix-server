import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { AuthService } from '../auth.service';
import { UnauthorizedException, Injectable } from '@nestjs/common';

const options: IStrategyOptions = {
  usernameField: 'email',
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(options);
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    console.log(user, 'user');
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
