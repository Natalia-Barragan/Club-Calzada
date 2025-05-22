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
exports.getCredentialServices = exports.checkUserCredentials = void 0;
const credentials = [];
let id = 1;
const crypPass = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hash = yield crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
});
const checkUserExists = (username) => {
    const usernameFound = credentials.find((credential) => credential.username === username);
    if (usernameFound) {
        throw new Error('El usuario ya existe, por favor elige otro');
    }
};
const checkUserCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameFound = credentials.find((credential) => credential.username === username);
    const cryptPassword = yield crypPass(password);
    return (usernameFound === null || usernameFound === void 0 ? void 0 : usernameFound.password) === cryptPassword ? usernameFound.id : undefined;
});
exports.checkUserCredentials = checkUserCredentials;
const getCredentialServices = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    checkUserExists(username);
    const cryptPassword = yield crypPass(password);
    console.log('cryptPassword', cryptPassword);
    const credential = {
        id: id,
        username: username,
        password: password,
    };
    credentials.push(credential);
    return id++;
});
exports.getCredentialServices = getCredentialServices;
console.log((0, exports.getCredentialServices)('camilo', 'camilo123'));
console.log(credentials);
