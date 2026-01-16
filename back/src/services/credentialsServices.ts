import { EntityManager } from 'typeorm';
import { CredentialModel } from '../config/data-sources';
import { Credential } from '../entities/Credential.entity';

export const crypPass = async (text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

export const checkUserExists = async (username: string): Promise<void> => {
    const usernameFound = await CredentialModel.findOne({ where: { username } });
    if (usernameFound) {
        throw new Error('El usuario ya existe, por favor elige otro');
    }
};

export const getCredentialServices = async (
    entityManager: EntityManager,
    username: string,
    password: string
): Promise<Credential> => {
    await checkUserExists(username);

    const cryptPassword = await crypPass(password);
    const newCredential = entityManager.create(Credential, { username, password: cryptPassword });

    const credentialSave = await entityManager.save(newCredential);
    return credentialSave;
};

export const checkUserCredentials = async (
    username: string,
    password: string
): Promise<Credential> => {

    const credentialFound = await CredentialModel.findOne({ where: { username } });

    const cryptPassword = await crypPass(password);

    if (credentialFound?.password === cryptPassword) {
        return credentialFound;
    } else {
        throw new Error('Usuario o contraseña incorrectos');
    }
};

