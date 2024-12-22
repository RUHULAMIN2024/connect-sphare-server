import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { createToken } from './auth.utils';
import bcrypt from 'bcrypt';
const createUser = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: { email: string; password: string }) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  const plainPassword = payload?.password;
  const hashedPassword = user.password;
  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(plainPassword, hashedPassword);
  if (!isPasswordMatched)
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '30d',
  );

  return {
    token,
  };
};

export const UserService = {
  createUser,
  loginUser,
};
