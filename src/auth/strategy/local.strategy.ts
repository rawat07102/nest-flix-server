import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { AuthService } from '../auth.service';
import { UnauthorizedException, Injectable, Inject } from '@nestjs/common';
import { Services } from '@src/lib/constants';

const options: IStrategyOptions = {
  usernameField: 'email',
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Services.AUTH_SERVICE)
    private authService: AuthService,
  ) {
    super(options);
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
