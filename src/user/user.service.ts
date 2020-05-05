import * as bcrypt from 'bcrypt';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDTO, UserDTO } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { MyHttpService } from 'src/http/http.service';
import { MovieDto } from 'src/movie/dto/movie.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    private http: MyHttpService,
  ) {}

  clearCollection() {
    this.userModel.collection.deleteMany({});
    return 'succesfully cleared user collection';
  }

  async getAll() {
    try {
      const userArray = await this.userModel.find().select('-password');
      return userArray.map(user => this.toDto(user));
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userModel
        .findOne({ email })
        .select('-likedMovies');
      return this.toDto(user);
    } catch (err) {
      throw new InternalServerErrorException(err, '[findByEmail]');
    }
  }

  toDto(user: IUser): UserDTO {
    const { email, username, id } = user;
    return { email, username, id };
  }

  async create(user: CreateUserDTO): Promise<UserDTO> {
    const { password, ...userDetails } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new this.userModel({
      password: hashedPassword,
      ...userDetails,
    }).save();

    return this.toDto(newUser);
  }

  async likeMovie(movieId: string, userId: UserDTO['id']) {
    const user = await this.userModel.findById(userId);
    const { likedMovies } = user;

    if (likedMovies.length && likedMovies.includes(movieId)) {
      return true;
    }

    likedMovies.push(movieId);

    user.likedMovies = likedMovies;

    await user.save();
    return true;
  }

  async getLikedMoviesByUserId(userId: UserDTO['id']) {
    const { likedMovies } = await this.userModel.findById(userId);
    const urls = likedMovies.map(movieId => this.http.getMovieUrl(movieId));
    const data = await this.http.getAll<MovieDto>(urls);
    return data;
  }
}
