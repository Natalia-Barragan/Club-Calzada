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
exports.deleteUserService = exports.getUserByIdService = exports.getUsersService = exports.registerUserService = void 0;
const credentialsServices_1 = require("./credentialsServices");
const users = [];
let id = 1;
const registerUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialId = yield (0, credentialsServices_1.getCredentialServices)(userData.username, userData.password);
    const newUser = {
        id: id,
        name: userData.name,
        email: userData.email,
        birthdate: new Date(userData.birthdate),
        nDni: userData.nDni,
        credentialsId: credentialId,
    };
    users.push(newUser);
    id++;
    return newUser;
});
exports.registerUserService = registerUserService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return users.map((user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    });
});
exports.getUsersService = getUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userfound = users.find((user) => user.id === id);
    if (!userfound)
        throw new Error('el usuario con Id ${id} no existe');
    return userfound;
});
exports.getUserByIdService = getUserByIdService;
const deleteUserService = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteUserService = deleteUserService;
