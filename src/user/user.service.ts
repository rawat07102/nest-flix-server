import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { MovieDTO } from '@movie/dto/movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@lib/typeorm';
import { Repository } from 'typeorm';
import { IUserService } from './interfaces/user.interface';
import { Services } from '@src/lib/constants';
import { IMovieService } from '@src/movie/interfaces/movie.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @Inject(Services.MOVIE_SERVICE)
    private readonly movieService: IMovieService,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepo
        .createQueryBuilder()
        .where({ email })
        .select(['username', 'email', 'password'])
        .getOne();
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err, '[findByEmail]');
    }
  }

  async create(user: CreateUserDTO): Promise<UserEntity> {
    const alreadyExistingUser = await this.userRepo
      .createQueryBuilder()
      .where({ email: user.email })
      .orWhere({ username: user.username })
      .getOne();

    if (alreadyExistingUser) {
      if (alreadyExistingUser.username === user.username) {
        throw new ConflictException(
          `user with username ${user.username} already exists`,
        );
      }
      if (alreadyExistingUser.email === user.email) {
        throw new ConflictException(
          `user with email ${user.email} already exists`,
        );
      }
    }

    const newUser = await this.userRepo.create(user).save();
    return newUser;
  }

  async likeMovie(movieId: string, userId: UserEntity['id']): Promise<void> {
    const user = await this.userRepo.findOneBy({ id: userId });
    const { likedMovies } = user;

    if (likedMovies.length && likedMovies.includes(movieId)) {
      return;
    }

    likedMovies.push(movieId);
    user.likedMovies = likedMovies;
    await user.save();
  }

  async getLikedMoviesByUserId(userId: UserEntity['id']): Promise<MovieDTO[]> {
    // const { likedMovies } = await this.userRepo.findOneBy({ id: userId });
    // const urls = likedMovies.map((movieId) => this.http.getMovieUrl(movieId));
    // const data = await this.http.getAll<MovieDTO>(urls);
    // return data;

    const { likedMovies } = await this.userRepo.findOneBy({ id: userId });
    const res: MovieDTO[] = [];
    this.movieService
      .getMultiple(likedMovies)
      .map((obs) => obs.forEach((value) => res.push(value)));
    return res;
  }
}
