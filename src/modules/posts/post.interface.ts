import { Types } from 'mongoose';

export interface IPost {
  title: string;
  description: string;
  postTag: string[];
  upVotes: number;
  downVotes: number;
  voters: string[];
  author: Types.ObjectId;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
