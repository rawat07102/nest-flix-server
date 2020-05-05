import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @InjectModel('User') private userModel: Model<IUser>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).select('-likedMovies');
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (user && isValidPassword) {
      return this.userService.toDto(user);
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
