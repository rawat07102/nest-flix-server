import { Exclude, instanceToPlain } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsString } from 'class-validator';
import { BeforeInsert, Column } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { UserResponseObject } from 'src/user/dto/user.dto';

export class UserEntity extends AbstractEntity {
  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @IsString({ each: true })
  @Column('string', { array: true })
  likedMovies: string[];

  @BeforeInsert()
  async hashPassword() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }

  async findInLikedMovies(id: UserEntity['likedMovies'][0]) {
    return this.likedMovies.find((i) => i === id);
  }

  async findIndexLikedMovies(id: string) {
    return this.likedMovies.findIndex((i) => i === id);
  }

  async likeMovie(id: string) {
    if (this.likedMovies.length && this.likedMovies.includes(id)) {
      return;
    }
    const likedMovies = this.likedMovies;
    likedMovies.push(id);
    this.likedMovies = likedMovies;
    await this.save();
  }

  async unLikeMovie(id: string) {
    if (this.likedMovies.length && this.likedMovies.includes(id)) {
      return;
    }
  }

  async comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  toResponseObject(): UserResponseObject {
    return <UserResponseObject>instanceToPlain(this);
  }
}
