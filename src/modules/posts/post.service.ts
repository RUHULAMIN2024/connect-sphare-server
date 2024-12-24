/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { searchableFields } from './post.constant';
import { IPost } from './post.interface';
import { Post } from './post.model';
import mongoose from 'mongoose';

const createPost = async (payload: IPost) => {
  const result = (await Post.create(payload)).populate('author');
  return result;
};
const updatePost = async (
  PostId: string,
  userId: string,
  payload: Partial<IPost>,
) => {
  const isPostExist = await Post.findById(PostId);
  if (!isPostExist) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Post not found');
  }
  if (isPostExist.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to delete this Post',
    );
  }
  const result = await Post.findByIdAndUpdate(PostId, payload, {
    new: true,
    runValidators: true,
  }).populate('author');
  return result;
};

const deletePost = async (id: string, userId: string) => {
  const isPostExist = await Post.findById(id);
  if (!isPostExist) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Post not found');
  }
  if (isPostExist.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to delete this Post',
    );
  }
  const result = await Post.findByIdAndDelete(id);

  return result;
};

const getSinglePost = async (id: string) => {
  const result = await Post.findById(id).populate('author');
  return result;
};

const getAllPost = async (query: Record<string, unknown>) => {
  const PostQuery = new QueryBuilder(Post.find().populate('author'), query)
    .search(searchableFields)
    .filter()
    .sort();

  const result = await PostQuery.modelQuery;
  return result;
};

export const PostService = {
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  getAllPost,
};
