import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { CreateUserDTO } from '@auth/dto/CreateUserDTO';
import { MovieDTO } from '@movie/dto/movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@lib/typeorm';
import { Repository } from 'typeorm';
import { IUserService } from './interfaces/user.interface';
import { Services } from '@lib/constants';
import { IMovieService } from '@movie/interfaces/movie.interface';
import { UserResponseDTO } from './dto/UserResponseDTO';
import { forkJoin, from, map, Observable, tap } from 'rxjs';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @Inject(Services.MOVIE_SERVICE)
    private readonly movieService: IMovieService,
  ) {}

  async findById(id: number): Promise<UserEntity> {
    return this.userRepo.findOneBy({ id });
  }

  getAll(limit = 10, skip = 0): Observable<UserResponseDTO[]> {
    const usersObs = from(
      this.userRepo.find({
        take: limit,
        skip,
      }),
    );
    return usersObs.pipe(
      map((users) => users.map((user) => user.toResponseObject())),
    );
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepo.findOne({
        where: {
          email,
        },
        select: ['id', 'email', 'password', 'username'],
      });
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
    let res: MovieDTO[] = [];
    forkJoin(this.movieService.getMultiple(likedMovies))
      .subscribe((results) => {
        res = results;
      });
    return res;
  }
}
