import { getUsersService, getUserByIdService, registerUserService, loginUserService } from '../services/userServices';

import { UserDto } from '../dto/UserDto';
import { Request, Response } from 'express';
import { UserRegisterDto, UserLoginDto } from '../dto/UserDto';
import { User } from '../entities/User.entity';
import { PostgresError } from '../interfaces/postgresErrorInterface';



export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: UserDto[] = await getUsersService();
        res.status(200).json({
            message: 'Lista de usuarios',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userfound: UserDto | undefined = await getUserByIdService(parseInt(req.params.id, 10));
        res.status(200).json({
            message: 'Usuario encontrado',
            data: userfound
        });
    } catch (error) {
        res.status(404).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

export const registerUser = async (req: Request<unknown, unknown, UserRegisterDto>, res: Response): Promise<void> => {

    try {
        const newUser: User = await registerUserService(req.body);
        res.status(201).json({
            message: 'Usuario creado',
            data: newUser
        });
    }
    catch (error) {
        const err = error as PostgresError

        res.status(400).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? err.detail ? err.detail : err.message : 'Error desconocido'
        });
    };
}

export const loginUser = async (req: Request<unknown, unknown, UserLoginDto>, res: Response): Promise<void> => {
    try {
        const user: User | null = await loginUserService(req.body);
        res.status(200).json({
            message: 'Usuario logueado',
            login: true,
            user: user
        });
    } catch (error) {
        res.status(400).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedUser: User = await updateProfileService(parseInt(req.params.id, 10), req.body);
        res.status(200).json({
            message: 'Usuario actualizado',
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}



