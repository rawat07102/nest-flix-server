import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local.auth-guard';
import { AuthService } from './auth.service';
import { IRequestWithUser } from './types/RequestWithUser';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: IRequestWithUser) {
    return this.authService.login(req.user);
  }
}
