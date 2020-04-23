import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (user && isValidPassword) {
      return user.toObject();
    }

    return null;
  }

  login(user: UserDTO) {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
