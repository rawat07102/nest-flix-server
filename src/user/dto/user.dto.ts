import { IsString, IsEmail, Length } from 'class-validator';

export class UserDTO {
  id: string;
  username: string;
  email: string;
  likedMovies?: string[];
}

export class UserWithPassword extends UserDTO {
  password: string;
}

export class CreateUserDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @Length(8)
  password: string;
}

export class LoginUserDTO {
  email: string;
  password: string;
}
