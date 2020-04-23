import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { IPayload } from '../types/payload';
import { UserDTO } from 'src/user/dto/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    } as StrategyOptions);
  }

  validate(payload: IPayload): UserDTO {
    const { sub: id, ...user } = payload;
    return { id, ...user };
  }
}
