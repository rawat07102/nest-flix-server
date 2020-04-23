import { UserDTO } from 'src/user/dto/user.dto';

export interface IPayload {
  username: UserDTO['username'];
  sub: UserDTO['id'];
  email: UserDTO['email'];
}
