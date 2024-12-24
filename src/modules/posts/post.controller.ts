import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostService } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const payload = req.body;
  payload.author = req.user?.userId;
  const result = await PostService.createPost(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Post  created successfully',
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  const result = await PostService.updatePost(id, userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post is updated succesfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userId = req.user?.userId;
  const result = await PostService.deletePost(id, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post is deleted succesfully',
    data: result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostService.getSinglePost(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post is retrieved succesfully',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostService.getAllPost(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Posts are retrieved successfully',
    data: result,
  });
});

export const PostController = {
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  getAllPosts,
};
