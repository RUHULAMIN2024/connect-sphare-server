import { z } from 'zod';

export const PostValidationSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  postTag: z.array(z.string().trim().min(1, 'Tag must be a non-empty string')),
});

export const PostUpdateValidationSchema = z.object({
  title: z.string().trim().optional(),
  description: z.string().trim().optional(),
  postTag: z.array(z.string().trim()).optional(),
});
