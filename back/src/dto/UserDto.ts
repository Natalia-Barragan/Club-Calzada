export interface UserRegisterDto {
    name: string,
    nDni: number;
    email: string;
    birthdate: Date;
    username: string;
    password: string;   
}

export interface UserDto {
    id: number;
    name: string,
    email: string;
}

export interface UserLoginDto{
    username: string,                   
    password: string,
}

