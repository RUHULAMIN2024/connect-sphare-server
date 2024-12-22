import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  image: string;
  password: string;
  role: 'admin' | 'user';
  badge: 'bronze' | 'silver' | 'gold';
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<IUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type IUserRole = keyof typeof USER_ROLE;
