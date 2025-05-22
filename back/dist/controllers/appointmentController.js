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
exports.cancelAppointment = exports.registerAppointment = exports.getAppointmentsId = exports.getAppointments = void 0;
const appointmentServices_1 = require("../services/appointmentServices");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentServices_1.getAppointmentService)();
        res.status(200).json(appointments);
    }
    catch (error) {
        res.status(500).json({ message: 'Ocurrio un error', error: error instanceof Error ? error.message : 'Error desconocido' });
    }
});
exports.getAppointments = getAppointments;
const getAppointmentsId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentFound = yield (0, appointmentServices_1.getAppointmentByIdService)(parseInt(req.params.id, 10));
        res.status(200).json(appointmentFound);
    }
    catch (error) {
        res.status(500).json({ message: 'Ocurrio un error', error: error instanceof Error ? error.message : 'Error desconocido' });
    }
});
exports.getAppointmentsId = getAppointmentsId;
const registerAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = yield (0, appointmentServices_1.registerAppointmentService)(req.body);
        res.status(201).json(newAppointment);
    }
    catch (error) {
        res.status(500).json({ message: 'Ocurrio un error', error: error instanceof Error ? error.message : 'Error desconocido' });
    }
});
exports.registerAppointment = registerAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, appointmentServices_1.cancelAppointmentService)(parseInt(req.params.id, 10));
        res.status(200).json({ msg: 'Cita cancelada' });
    }
    catch (error) {
        res.status(500).json({ message: 'Ocurrio un error', error: error instanceof Error ? error.message : 'Error desconocido' });
    }
});
exports.cancelAppointment = cancelAppointment;
