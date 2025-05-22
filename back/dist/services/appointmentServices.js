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
exports.cancelAppointmentService = exports.registerAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentService = void 0;
const IAppointment_1 = require("../interfaces/IAppointment");
const userServices_1 = require("./userServices");
const appointments = [];
let id = 1;
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    return appointments;
});
exports.getAppointmentService = getAppointmentService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const apponintmentFound = appointments.find(app => app.id === id);
    if (!apponintmentFound)
        throw new Error("EL turno con id ${id} no fue encontrado");
    return apponintmentFound;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const registerAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield (0, userServices_1.getUserByIdService)(appointmentData.userId);
    const apponintmentFound = appointments.find(app => app.userId === appointmentData.userId && app.time === appointmentData.time && new Date(app.date).getTime() === new Date(appointmentData.date).getTime());
    if (apponintmentFound)
        throw new Error("Ya existe un turno para el usuario en esa fecha y hora");
    const newAppointment = {
        id: id++,
        date: appointmentData.date,
        time: appointmentData.time,
        status: IAppointment_1.Status.active,
        userId: (userFound === null || userFound === void 0 ? void 0 : userFound.id) || 0
    };
    appointments.push(newAppointment);
    return newAppointment;
});
exports.registerAppointmentService = registerAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield (0, exports.getAppointmentByIdService)(id);
    appointmentFound.status = IAppointment_1.Status.cancelled;
});
exports.cancelAppointmentService = cancelAppointmentService;
