import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UserDTO } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { MyHttpService } from 'src/http/http.service';

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

  getAll() {
    return this.userModel.find().select('-password');
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).select('-likedMovies');
  }

  sanitize(user: IUser): UserDTO {
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

    return newUser.toObject();
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
    const data = await this.http.getAll(urls);
    return data;
  }
}
