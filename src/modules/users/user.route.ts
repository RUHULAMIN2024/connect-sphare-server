import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userLoginZod, userSchemaZod } from './user.validation';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/register',
  validateRequest(userSchemaZod),
  UserController.createUser,
);
router.post('/login', validateRequest(userLoginZod), UserController.loginUser);

export const UserRoutes = router;
