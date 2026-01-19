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
exports.updateProfile = exports.loginUser = exports.registerUser = exports.getUserById = exports.getUsers = void 0;
const userServices_1 = require("../services/userServices");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userServices_1.getUsersService)();
        res.status(200).json({
            message: 'Lista de usuarios',
            data: users
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userfound = yield (0, userServices_1.getUserByIdService)(parseInt(req.params.id, 10));
        res.status(200).json({
            message: 'Usuario encontrado',
            data: userfound
        });
    }
    catch (error) {
        res.status(404).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
exports.getUserById = getUserById;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, userServices_1.registerUserService)(req.body);
        res.status(201).json({
            message: 'Usuario creado',
            data: newUser
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? err.detail ? err.detail : err.message : 'Error desconocido'
        });
    }
    ;
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userServices_1.loginUserService)(req.body);
        res.status(200).json({
            message: 'Usuario logueado',
            login: true,
            user: user
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
exports.loginUser = loginUser;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield (0, userServices_1.updateProfileService)(parseInt(req.params.id, 10), req.body);
        res.status(200).json({
            message: 'Usuario actualizado',
            data: updatedUser
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
exports.updateProfile = updateProfile;
