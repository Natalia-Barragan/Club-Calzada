import { UserDto, UserRegisterDto, UserLoginDto, UserUpdateDto } from '../dto/UserDto';
import { getCredentialServices, checkUserCredentials } from './credentialsServices';
import { AppDataSource, getUserModel } from '../config/data-sources';
import { User } from '../entities/User.entity';
import { Credential } from '../entities/Credential.entity';


export const registerUserService = async (userData: UserRegisterDto): Promise<User> => {


    const resultadoTransaccion = await AppDataSource.transaction(async (entityManager) => {
        const credential: Credential = await getCredentialServices(entityManager, userData.username, userData.password);


        const newUser: User = entityManager.create(User, {
            name: userData.name,
            lastName: userData.lastName,
            email: userData.email,
            birthdate: new Date(userData.birthdate),
            nDni: userData.nDni,
            memberNumber: userData.memberNumber || "",
            photoUrl: userData.photoUrl || "https://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png",
            credentials: credential,
        })

        await entityManager.save(newUser);

        return newUser;
    });

    return resultadoTransaccion;
};

export const getUsersService = async (): Promise<UserDto[]> => {
    // 1. Cargamos todos los socios con sus pagos
    const users: User[] = await getUserModel().find({ relations: ['payments'] });
    
    // 2. Automatización: Regla del día 15 (Más suave para que no borre pagos recién hechos)
    const today = new Date();
    const dayOfMonth = today.getDate();
    
    // Solo activar si ya pasó el 15 y es una hora tranquila
    if (dayOfMonth >= 15) {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const currentMonthYear = `${months[today.getMonth()]} ${today.getFullYear()}`;
        
        // Marcamos deudores pero SIN pisar los pagos que acaban de entrar
        const debtorIds = users
            .filter(u => u.active && u.payments && u.payments.length > 0 && !u.payments.some(p => p.month === currentMonthYear))
            .map(u => u.id);

        if (debtorIds.length > 0) {
            await getUserModel().update(debtorIds, { active: false });
            debtorIds.forEach(id => {
                const u = users.find(user => user.id === id);
                if (u) u.active = false;
            });
        }
    }

    return users;
};


export const getUserByIdService = async (id: number): Promise<UserDto | undefined> => {
    const userfound: User | null = await getUserModel().findOne({
        where: { id: id },
        relations: ['appointments']
    })
    if (!userfound) throw new Error(`el usuario con Id ${id} no existe`);
    return userfound;
};

export const deleteUserService = async () => { };


export const loginUserService = async (userCredencials: UserLoginDto): Promise<User | null> => {

    const credential: Credential = await checkUserCredentials(userCredencials.username, userCredencials.password);
    const userFound: User | null = await getUserModel().findOne({
        where: { credentials: { id: credential.id } },
    });

    return userFound;
};

export const updateProfileService = async (id: number, userData: UserUpdateDto): Promise<User> => {
    const userFound: User | null = await getUserModel().findOne({ where: { id: id } });
    if (!userFound) throw new Error(`el usuario con Id ${id} no existe`);
    
    if (userData.name) userFound.name = userData.name;
    if (userData.lastName) userFound.lastName = userData.lastName;
    if (userData.email) userFound.email = userData.email;
    if (userData.birthdate) userFound.birthdate = new Date(userData.birthdate);
    if (userData.nDni) userFound.nDni = userData.nDni;
    if (userData.memberNumber !== undefined) userFound.memberNumber = userData.memberNumber;
    if (userData.photoUrl !== undefined) userFound.photoUrl = userData.photoUrl;
    if (userData.active !== undefined) userFound.active = userData.active;
    
    await getUserModel().save(userFound);
    return userFound;
}