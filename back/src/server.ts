import express, { Application } from 'express';
import router from './routes/indexRoutes';
import morgan from 'morgan';
import cors from 'cors';


const server: Application = express();

server.use(cors());

server.use(express.json());
server.use(morgan('dev'));
// Manual CORS to rule out library issues
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use(router);

export default server;

