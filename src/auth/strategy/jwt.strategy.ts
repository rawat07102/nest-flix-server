import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { IPayload } from '../types/payload';
import { UserDTO } from 'src/user/dto/user.dto';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

export const extractFromCookie = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: extractFromCookie,
    } as StrategyOptions);
  }

  validate(payload: IPayload): UserDTO {
    const { sub: id, ...user } = payload;
    return { id, ...user };
  }
}
