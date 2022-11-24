import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @Length(8, 32)
  username: string;

  @IsEmail()
  email: string;

  @Length(8)
  password: string;
}
