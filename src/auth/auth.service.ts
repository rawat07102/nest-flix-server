import { Inject, Injectable } from '@nestjs/common';
import { Services } from '@src/lib/constants';
import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Services.USER_SERVICE)
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;

    if (user && user.comparePassword(password)) {
      return user.toResponseObject();
    }

    return null;
  }
}
