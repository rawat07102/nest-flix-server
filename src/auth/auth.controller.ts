import { Response } from 'express';
import {
  Controller,
  Post,
  Req,
  UseGuards,
  Res,
  Inject,
  Body,
  Get,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { IUserService } from '@src/user/interfaces/user.interface';
import { Services } from '@src/lib/constants';
import { LocalAuthGuard } from './guard/local.auth-guard';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '@src/user/dto/user.dto';
import { AuthenticatedUser } from './decorators/AuthenticatedUser.decorator';
import { IAuthenticatedUser } from './interfaces/IAuthenticatedUser';
import { IsAuthenticatedGuard } from './guard/isAuthenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.AUTH_SERVICE) private readonly authService: AuthService,
    @Inject(Services.USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDTO) {
    return (await this.userService.create(createUserDto)).toResponseObject();
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@AuthenticatedUser() user: IAuthenticatedUser) {}

  @Get('status')
  @UseGuards(IsAuthenticatedGuard)
  async status(@AuthenticatedUser() user: IAuthenticatedUser) {
    return user;
  }
}
