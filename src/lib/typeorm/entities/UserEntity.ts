import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Column } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';

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
}
