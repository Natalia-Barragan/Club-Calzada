import IUser from '../interfaces/IUser';
import {UserDto, UserRegisterDto} from '../dto/UserDto';
import {getCredentialServices} from './credentialsServices';
import { log } from 'console';
const users: IUser[] = [];

let id: number = 1;

export const registerUserService = async (userData: UserRegisterDto): Promise<IUser> => {

    const credentialId: number = await getCredentialServices(userData.username, userData.password);

    const newUser: IUser = {
        id: id,
        name: userData.name,        
        email: userData.email,
        birthdate: new Date(userData.birthdate),
        nDni: userData.nDni,
        credentialsId: credentialId,
    
    };
    users.push(newUser);
    id++;
    return newUser;
};

export const getUsersService = async (): Promise<UserDto[]> => {
    return users.map((user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    });
};


export const getUserByIdService = async (id: number): Promise<UserDto | undefined> => {
    const userfound = users.find((user) => user.id === id);
    if (!userfound) throw new Error('el usuario con Id ${id} no existe');
    return userfound;
};

export const deleteUserService = async () => {};
