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
exports.updateProfileService = exports.loginUserService = exports.deleteUserService = exports.getUserByIdService = exports.getUsersService = exports.registerUserService = void 0;
const credentialsServices_1 = require("./credentialsServices");
const data_sources_1 = require("../config/data-sources");
const User_entity_1 = require("../entities/User.entity");
const registerUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const resultadoTransaccion = yield data_sources_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const credential = yield (0, credentialsServices_1.getCredentialServices)(entityManager, userData.username, userData.password);
        const newUser = entityManager.create(User_entity_1.User, {
            name: userData.name,
            email: userData.email,
            birthdate: new Date(userData.birthdate),
            nDni: userData.nDni,
            credentials: credential,
        });
        yield entityManager.save(newUser);
        return newUser;
    }));
    return resultadoTransaccion;
});
exports.registerUserService = registerUserService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_sources_1.UserModel.find();
    return users;
});
exports.getUsersService = getUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userfound = yield data_sources_1.UserModel.findOne({
        where: { id: id },
        relations: ['appointments']
    });
    if (!userfound)
        throw new Error(`el usuario con Id ${id} no existe`);
    return userfound;
});
exports.getUserByIdService = getUserByIdService;
const deleteUserService = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteUserService = deleteUserService;
const loginUserService = (userCredencials) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = yield (0, credentialsServices_1.checkUserCredentials)(userCredencials.username, userCredencials.password);
    const userFound = yield data_sources_1.UserModel.findOne({
        where: { credentials: { id: credential.id } },
    });
    return userFound;
});
exports.loginUserService = loginUserService;
const updateProfileService = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield data_sources_1.UserModel.findOne({ where: { id: id } });
    if (!userFound)
        throw new Error(`el usuario con Id ${id} no existe`);
    userFound.name = userData.name;
    userFound.email = userData.email;
    userFound.birthdate = new Date(userData.birthdate);
    userFound.nDni = userData.nDni;
    yield data_sources_1.UserModel.save(userFound);
    return userFound;
});
exports.updateProfileService = updateProfileService;
