import { Controller, Post, UseGuards, Inject, Body, Get } from '@nestjs/common';
import { IUserService } from '@user/interfaces/user.interface';
import { Routes, Services } from '@lib/constants';
import { LocalAuthGuard } from './guard/local.auth-guard';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { AuthenticatedUser } from './decorators/AuthenticatedUser.decorator';
import { IAuthenticatedUser } from './interfaces/IAuthenticatedUser';
import { IsAuthenticatedGuard } from './guard/isAuthenticated.guard';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDTO) {
    return (await this.userService.create(createUserDto)).toResponseObject();
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@AuthenticatedUser() _user: IAuthenticatedUser) {}

  @Get('status')
  @UseGuards(IsAuthenticatedGuard)
  async status(@AuthenticatedUser() user: IAuthenticatedUser) {
    return user;
  }
}
