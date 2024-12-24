import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  PostUpdateValidationSchema,
  PostValidationSchema,
} from './post.validation';
import { PostController } from './post.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
const router = express.Router();

router.post(
  '/',
  validateRequest(PostValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.user),
  PostController.createPost,
);
router.patch(
  '/:id',
  validateRequest(PostUpdateValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.user),
  PostController.updatePost,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  PostController.deletePost,
);
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getSinglePost);

export const PostRouts = router;
