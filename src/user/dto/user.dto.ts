export class UserDTO {
  _id: string;
  username: string;
  email: string;
}

export class CreateUserDTO {
  username: UserDTO['username'];
  email: UserDTO['email'];
  password: string;
}
