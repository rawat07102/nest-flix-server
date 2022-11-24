import { UserEntity } from '@src/lib/typeorm';
import { MovieDTO } from '@src/movie/dto/movie.dto';
import { CreateUserDTO } from '@auth/dto/CreateUserDTO';

export interface IUserService {
  findById(id: number): Promise<UserEntity>
  findByEmail(email: string): Promise<UserEntity>;
  create(user: CreateUserDTO): Promise<UserEntity>;
  likeMovie(movieId: string, userId: UserEntity['id']): Promise<void>;
  getLikedMoviesByUserId(userId: UserEntity['id']): Promise<MovieDTO[]>;
}

