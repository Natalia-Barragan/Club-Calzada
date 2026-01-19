"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    BD_HOST: process.env.BD_HOST,
    BD_PORT: process.env.BD_PORT ? parseInt(process.env.BD_PORT, 10) : 5432,
    BD_USERNAME: process.env.BD_USERNAME,
    BD_PASSWORD: process.env.BD_PASSWORD,
    BD_NAME: process.env.BD_NAME,
    BD_SYNC: process.env.BD_SYNC ? process.env.BD_SYNC === 'true' : true,
    BD_DROP_SCHEMA: process.env.BD_DROP_SCHEMA ? process.env.BD_DROP_SCHEMA === 'true' : true,
    DB_LOGGING: process.env.DB_LOGGING ? process.env.DB_LOGGING === 'true' : true,
    BD_SSL: process.env.BD_SSL === 'true',
};
