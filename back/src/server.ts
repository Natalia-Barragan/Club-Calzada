import express, { Application } from 'express';
import router from './routes/indexRoutes';
import morgan from 'morgan';
import cors from 'cors';


import { paymentsRouter } from './routes/paymentsRouter';

const server: Application = express();

server.use(cors());

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));
server.use(morgan('dev'));

// Registro de Rutas Único
server.use('/cobros', paymentsRouter);
server.use(router);

export default server;

