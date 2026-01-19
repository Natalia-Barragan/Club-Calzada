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
exports.checkUserCredentials = exports.getCredentialServices = exports.checkUserExists = exports.crypPass = void 0;
const data_sources_1 = require("../config/data-sources");
const Credential_entity_1 = require("../entities/Credential.entity");
const crypPass = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hash = yield crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
});
exports.crypPass = crypPass;
const checkUserExists = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameFound = yield data_sources_1.CredentialModel.findOne({ where: { username } });
    if (usernameFound) {
        throw new Error('El usuario ya existe, por favor elige otro');
    }
});
exports.checkUserExists = checkUserExists;
const getCredentialServices = (entityManager, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.checkUserExists)(username);
    const cryptPassword = yield (0, exports.crypPass)(password);
    const newCredential = entityManager.create(Credential_entity_1.Credential, { username, password: cryptPassword });
    const credentialSave = yield entityManager.save(newCredential);
    return credentialSave;
});
exports.getCredentialServices = getCredentialServices;
const checkUserCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialFound = yield data_sources_1.CredentialModel.findOne({ where: { username } });
    const cryptPassword = yield (0, exports.crypPass)(password);
    if ((credentialFound === null || credentialFound === void 0 ? void 0 : credentialFound.password) === cryptPassword) {
        return credentialFound;
    }
    else {
        throw new Error('Usuario o contraseña incorrectos');
    }
});
exports.checkUserCredentials = checkUserCredentials;
