import { getUsersService, getUserByIdService, deleteUserService, registerUserService } from '../services/userServices';
import IUser from '../interfaces/IUser';
import { UserDto } from '../dto/UserDto';
import { Request, Response } from 'express';
import { UserRegisterDto, UserLoginDto } from '../dto/UserDto';



export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try{
        const users: UserDto[] = await getUsersService();
        console.log(users);
        res.status(200).json({
            message: 'Lista de usuarios',
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: 'Ocurrio un error',
        error: error instanceof Error ? error.message : 'Error desconocido' });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userfound :UserDto | undefined = await getUserByIdService(parseInt(req.params.id, 10));
        res.status(200).json( {
            message: 'Usuario encontrado',
            data: userfound});
    } catch (error) {
        res.status(500).json({ message: 'Ocurrio un error',
        error: error instanceof Error ? error.message : 'Error desconocido' });
    }    
};

export const registerUser = async (req: Request<unknown, unknown, UserRegisterDto>, res: Response): Promise<void> => {
    
    try {
        const newUser: IUser = await registerUserService(req.body);
        res.status(201).json({
            message: 'Usuario creado',
            data: newUser
        });}
    catch (error) {        
        res.status(500).json({ message: 'Ocurrio un error', 
        error: error instanceof Error ? error.message : 'Error desconocido' });
        };
} 

