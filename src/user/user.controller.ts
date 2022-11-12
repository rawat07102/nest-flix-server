import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req as AuthenticatedUser,
  Param,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from '@src/auth/guard/local.auth-guard';
import { IAuthenticatedUser } from '@src/auth/interfaces/IAuthenticatedUser';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Get('profile')
  async getProfile(@AuthenticatedUser() authenticatedUser: IAuthenticatedUser) {
    return this.userService.findByEmail(authenticatedUser.email);
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
