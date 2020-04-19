import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  serialize(user: IUser) {
    const { password, ...userDetails } = user;
    return { ...userDetails };
  }

  getAll() {
    return this.userModel.find();
  }

  find(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(user: CreateUserDTO) {
    const { password, ...userDetails } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new this.userModel({
      password: hashedPassword,
      ...userDetails,
    }).save();

    return this.serialize(newUser);
  }
}
