import { IsString, IsEmail, Length } from 'class-validator';

export class UserResponseObject {
  id: number;
  username: string;
  email: string;
  likedMovies: string[];
}

export class CreateUserDTO {
  @IsString()
  @Length(8 ,32)
  username: string;

  @IsEmail()
  email: string;

  @Length(8)
  password: string;
}

export class LoginUserDTO {
  @IsEmail()
  email: string;

  @Length(8, 32)
  password: string;
}
