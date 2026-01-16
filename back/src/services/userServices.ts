import { UserDto, UserRegisterDto, UserLoginDto } from '../dto/UserDto';
import { getCredentialServices, checkUserCredentials } from './credentialsServices';
import { AppDataSource, UserModel } from '../config/data-sources';
import { User } from '../entities/User.entity';
import { Credential } from '../entities/Credential.entity';


export const registerUserService = async (userData: UserRegisterDto): Promise<User> => {


    const resultadoTransaccion = await AppDataSource.transaction(async (entityManager) => {
        const credential: Credential = await getCredentialServices(entityManager, userData.username, userData.password);


        const newUser: User = entityManager.create(User, {
            name: userData.name,
            email: userData.email,
            birthdate: new Date(userData.birthdate),
            nDni: userData.nDni,
            credentials: credential,
        })

        await entityManager.save(newUser);

        return newUser;
    });

    return resultadoTransaccion;
};

export const getUsersService = async (): Promise<UserDto[]> => {
    const users: User[] = await UserModel.find()
    return users
};


export const getUserByIdService = async (id: number): Promise<UserDto | undefined> => {
    const userfound: User | null = await UserModel.findOne({
        where: { id: id },
        relations: ['appointments']
    })
    if (!userfound) throw new Error(`el usuario con Id ${id} no existe`);
    return userfound;
};

export const deleteUserService = async () => { };


export const loginUserService = async (userCredencials: UserLoginDto): Promise<User | null> => {

    const credential: Credential = await checkUserCredentials(userCredencials.username, userCredencials.password);
    const userFound: User | null = await UserModel.findOne({
        where: { credentials: { id: credential.id } },
    });

    return userFound;
};

