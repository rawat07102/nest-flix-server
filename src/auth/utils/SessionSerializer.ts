import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Services } from '@src/lib/constants';
import { UserService } from '@src/user/user.service';

const debug = require('debug')('app:auth:session');

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USER_SERVICE)
    private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: {id: number}, done: Function) {
    const user = await this.userService.findById(payload.id);
    return user ? done(null, user.toResponseObject()) : done(null, null);
  }
}
