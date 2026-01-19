"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const envs_1 = require("./config/envs");
require("reflect-metadata");
const data_sources_1 = require("./config/data-sources");
data_sources_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected successfully");
    server_1.default.listen(envs_1.config.PORT, () => {
        console.log(`Server listening on port ${envs_1.config.PORT}`);
    });
})
    .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
});
