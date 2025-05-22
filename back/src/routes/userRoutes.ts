import {Router} from 'express';
import { getUsers, registerUser, getUserById } from '../controllers/userController';

export const userRouter : Router = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/register', registerUser);

// userRouter.delete('/', deleteUser);


