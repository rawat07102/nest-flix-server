import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.find(email);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (user && isValidPassword) {
      return this.userService.serialize(user);
    }

    return null;
  }
}
