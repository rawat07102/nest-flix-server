export class UserDTO {
  id: string;
  username: string;
  email: string;
  likedMovies?: string[];
}

export class CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export class LoginUserDTO {
  email: string;
  password: string;
}
