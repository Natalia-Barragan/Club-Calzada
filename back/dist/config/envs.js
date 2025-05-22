"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
