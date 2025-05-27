import {Router} from 'express';
import { getUsers, registerUser, getUserById, loginUser } from '../controllers/userController';

export const userRouter : Router = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser); 



