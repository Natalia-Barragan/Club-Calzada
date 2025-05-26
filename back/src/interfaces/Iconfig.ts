export interface Iconfig {
    PORT: number;
    BD_HOST: string | undefined;
    BD_PORT: number;
    BD_USERNAME: string | undefined;
    BD_PASSWORD: string | undefined;
    BD_NAME: string | undefined;
    BD_SYNC: boolean;
    BD_DROP_SCHEMA: boolean;
    DB_LOGGING: boolean;
}