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
const Appointment_Repository_1 = require("../repositories/Appointment.Repository");
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Appointment_Repository_1.AppointmentRepository.find({
        relations: ['user']
    });
});
exports.getAppointmentService = getAppointmentService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const apponintmentFound = yield Appointment_Repository_1.AppointmentRepository.findOne({ where: { id } });
    if (!apponintmentFound)
        throw new Error(`La reserva con id ${id} no fue encontrado`);
    return apponintmentFound;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const registerAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userServices_1.getUserByIdService)(appointmentData.userId);
    Appointment_Repository_1.AppointmentRepository.validateAllowAppointment(appointmentData.date, appointmentData.time);
    yield Appointment_Repository_1.AppointmentRepository.validateExistingApointment(appointmentData.userId, appointmentData.date, appointmentData.time);
    const newAppointment = Appointment_Repository_1.AppointmentRepository.create({
        date: appointmentData.date,
        time: appointmentData.time,
        description: appointmentData.description,
        user: {
            id: appointmentData.userId
        },
    });
    return yield Appointment_Repository_1.AppointmentRepository.save(newAppointment);
});
exports.registerAppointmentService = registerAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_Repository_1.AppointmentRepository.findOne({ where: { id } });
    if (!appointmentFound)
        throw new Error(`La reserva con id ${id} no fue encontrado`);
    appointmentFound.status = IAppointment_1.Status.cancelled;
    yield Appointment_Repository_1.AppointmentRepository.save(appointmentFound);
});
exports.cancelAppointmentService = cancelAppointmentService;
