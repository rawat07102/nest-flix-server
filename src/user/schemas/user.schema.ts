import { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    likedMovies: { type: [String], default: [] },
  },
  {
    toObject: {
      transform,
    },
  },
);

function transform(doc: IUser) {
  const { username, email, id } = doc;
  return { username, email, id };
}