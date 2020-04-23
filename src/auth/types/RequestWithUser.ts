import { Request } from 'express';
import { UserDTO } from 'src/user/dto/user.dto';

export interface IRequestWithUser extends Request {
  user: UserDTO;
}
