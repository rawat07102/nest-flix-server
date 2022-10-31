
import { UserEntity } from '@src/lib/typeorm';
import { MovieDTO } from '@src/movie/dto/movie.dto';
import { CreateUserDTO, UserResponseObject } from '../dto/user.dto';

export interface IUserService {
  findByEmail(email: string): Promise<UserEntity>
  create(user: CreateUserDTO): Promise<UserEntity>
  likeMovie(movieId: string, userId: UserEntity["id"]): Promise<void>
  getLikedMoviesByUserId(userId: UserEntity["id"]): Promise<MovieDTO[]>
}