"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.getUserById = exports.getUsers = void 0;
const userServices_1 = require("../services/userServices");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userServices_1.getUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido' });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userfound = yield (0, userServices_1.getUserByIdService)(parseInt(req.params.id, 10));
        res.status(200).json(userfound);
    }
    catch (error) {
        res.status(500).json({ message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido' });
    }
});
exports.getUserById = getUserById;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, userServices_1.registerUserService)(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido' });
    }
    ;
});
exports.registerUser = registerUser;
