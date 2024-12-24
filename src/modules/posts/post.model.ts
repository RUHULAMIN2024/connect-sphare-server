import { model, Schema } from 'mongoose';
import { IPost } from './post.interface';

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, required: true, trim: true },
    postTag: { type: [String], required: true },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },

    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Post = model<IPost>('Post', PostSchema);
