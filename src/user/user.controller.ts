import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth-guard';
import { IRequestWithUser } from 'src/auth/types/RequestWithUser';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers(@Req() req: Request) {
    return this.userService.getAll();
  }
  @Delete('clear')
  async clearUserCollection() {
    return this.userService.clearCollection();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: IRequestWithUser) {
    return this.userService.findByEmail(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('liked-movies')
  async getLikedMovies(@Req() req: IRequestWithUser) {
    return this.userService.getLikedMoviesByUserId(req.user.id);
  }

  @Post('register')
  async registerUser(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('like-movie/:movieId')
  async likeMovie(
    @Param('movieId') movieId: string,
    @Req() req: IRequestWithUser,
  ) {
    await this.userService.likeMovie(movieId, req.user.id);
    return true;
  }
}
