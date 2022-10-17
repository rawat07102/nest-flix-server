import { Exclude, instanceToPlain } from 'class-transformer';
import * as bcrypt from "bcrypt"
import { IsEmail } from 'class-validator';
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

  @Column('string', { array: true })
  likedMovies: string[];

  @BeforeInsert()
  async hashPassword() {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
  }

  async comparePassword(password: string) {
    return bcrypt.compare(password, this.password)
  }

  toResponseObject(): UserResponseObject {
    return <UserResponseObject>instanceToPlain(this)
  }
}
