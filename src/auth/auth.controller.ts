import {
  Controller,
  Post,
  Req,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import * as cookie from 'cookie';
import { LocalAuthGuard } from './guard/local.auth-guard';
import { AuthService } from './auth.service';
import { IRequestWithUser } from './types/RequestWithUser';
import { Response } from 'express';
import { JwtAuthGuard } from './guard/jwt.auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: IRequestWithUser, @Res() res: Response) {
    const { access_token } = this.authService.login(req.user);
    const tokenCookie = cookie.serialize('jwt', access_token, {
      sameSite: 'strict',
      httpOnly: true,
      secure: !!process.env.SECURE_COOKIE,
    });

    res.setHeader('Set-Cookie', tokenCookie);
    return res.json({ access_token });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
    res.status(HttpStatus.CREATED).json(true);
  }
}
