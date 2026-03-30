export interface UserRegisterDto {
    name: string;
    lastName: string;
    nDni: number;
    email: string;
    birthdate: Date;
    username: string;
    password: string;
    memberNumber?: string;
    photoUrl?: string;   
}

export interface UserUpdateDto {
    name?: string;
    lastName?: string;
    nDni?: number;
    email?: string;
    birthdate?: Date;
    memberNumber?: string;
    photoUrl?: string;
    active?: boolean;
}

export interface UserDto {
    id: number;
    name: string;
    lastName?: string;
    email: string;
    memberNumber?: string;
    photoUrl?: string;
    active?: boolean;
}

export interface UserLoginDto{
    username: string,                   
    password: string,
}

