import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req as AuthenticatedUser,
  Param,
  Inject,
} from '@nestjs/common';
import { CreateUserDTO } from '@auth/dto/CreateUserDTO';
import { UserService } from './user.service';
import { LocalAuthGuard } from '@src/auth/guard/local.auth-guard';
import { IAuthenticatedUser } from '@src/auth/interfaces/IAuthenticatedUser';
import { Services } from '@src/lib/constants';

@Controller('users')
export class UserController {
  constructor(
    @Inject(Services.USER_SERVICE)
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Get('profile')
  async getProfile(@AuthenticatedUser() authenticatedUser: IAuthenticatedUser) {
    return this.userService.findByEmail(authenticatedUser.email);
  }

  @Get('all')
  getAllUsers() {
    return this.userService.getAll();
  }

  @UseGuards(LocalAuthGuard)
  @Get('liked-movies')
  async getLikedMovies(
    @AuthenticatedUser() authenticatedUser: IAuthenticatedUser,
  ) {
    return this.userService.getLikedMoviesByUserId(authenticatedUser.id);
  }

  @Post('register')
  async registerUser(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('like-movie/:movieId')
  async likeMovie(
    @Param('movieId') movieId: string,
    @AuthenticatedUser() authenticatedUser: IAuthenticatedUser,
  ) {
    await this.userService.likeMovie(movieId, authenticatedUser.id);
    return true;
  }
}
