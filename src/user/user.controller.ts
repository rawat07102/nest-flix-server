import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async getAllUsers() {
    return this.userService.getAll();
  }

  @Post('/register')
  async registerUser(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }
}
