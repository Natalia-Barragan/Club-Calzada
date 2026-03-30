import { DataSource, Repository } from 'typeorm';
import { config } from './envs';
import { User } from '../entities/User.entity';
import { Credential } from '../entities/Credential.entity';
import { Payment } from '../entities/Payment.entity';
import { Appointment } from '../entities/Appointment.entity';

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
  ssl: { rejectUnauthorized: false }, 

  entities: [User, Credential, Payment, Appointment],
});

export const getUserModel = () => AppDataSource.getRepository(User);
export const getCredentialModel = () => AppDataSource.getRepository(Credential);
export const getPaymentModel = () => AppDataSource.getRepository(Payment);
export const getAppointmentModel = () => AppDataSource.getRepository(Appointment);
