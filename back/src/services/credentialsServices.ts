
import {ICredential} from '../interfaces/ICredential';


const credentials: ICredential[] = [];

let id: number = 1;

const crypPass = async (text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hash = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hash))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const checkUserExists = (username: string): void => {
    const usernameFound: ICredential | undefined = credentials.find((credential) => credential.username === username);
    if (usernameFound) {
        throw new Error('El usuario ya existe, por favor elige otro');
    }
}

export const checkUserCredentials = async (username: string, password: string) => {
    const usernameFound: ICredential | undefined = credentials.find((credential) => credential.username === username);
    const cryptPassword = await crypPass(password);
    return usernameFound ?.password === cryptPassword ? usernameFound.id : undefined
}    
    


export const getCredentialServices = async (username: string, password: string): Promise<number> =>  {
   checkUserExists(username);
   
    const cryptPassword = await crypPass(password);

    const credential = {
        id: id,
        username: username,
        password: password,
    };
    credentials.push(credential);
    return id++;
}   
