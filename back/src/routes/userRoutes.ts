import { Router } from 'express';
import { getUsers, registerUser, getUserById, loginUser, updateProfile } from '../controllers/userController';


import { checkAuth, checkAdmin } from '../middlewares/authMiddleware';

export const userRouter: Router = Router();

// Protegida: Solo Admin ve lista completa
userRouter.get('/', checkAuth, checkAdmin, getUsers);

// Protegida: Solo usuarios con sesión activa
userRouter.get('/:id', checkAuth, getUserById);
userRouter.put('/:id', checkAuth, updateProfile);

// Públicas
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);



