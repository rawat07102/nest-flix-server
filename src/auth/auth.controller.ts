import {
  Controller,
  Post,
  Req,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
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
    res.cookie('jwt', access_token, { sameSite: 'none', httpOnly: true });
    return res.json({ access_token });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
    res.status(HttpStatus.CREATED).json(true);
  }
}
