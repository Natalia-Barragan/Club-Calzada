import { DataSource, Repository } from 'typeorm';
import { config } from './envs';
import { User } from '../entities/User.entity';
import { Credential } from '../entities/Credential.TEMP';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.BD_HOST,
  port: config.BD_PORT,
  username: config.BD_USERNAME,
  password: config.BD_PASSWORD,
  database: config.BD_NAME,
  synchronize: config.BD_SYNC,
  dropSchema: config.BD_DROP_SCHEMA,
  logging: config.DB_LOGGING,
  ssl: { rejectUnauthorized: false }, // Simplificado para asegurar que Neon conecte

  // --- CORRECCIÓN CRÍTICA AQUÍ ---
  // __dirname permite que funcione tanto en 'src' (local) como en 'dist' (producción)
  entities: [__dirname + "/../entities/*.entity{.ts,.js}"],
});

export const UserModel: Repository<User> = AppDataSource.getRepository(User);
export const CredentialModel: Repository<Credential> = AppDataSource.getRepository(Credential);