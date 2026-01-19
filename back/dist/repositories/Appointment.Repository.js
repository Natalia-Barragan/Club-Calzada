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
exports.AppointmentRepository = void 0;
const data_sources_1 = require("../config/data-sources");
const Appointment_entity_1 = require("../entities/Appointment.entity");
exports.AppointmentRepository = data_sources_1.AppDataSource.getRepository(Appointment_entity_1.Appointment).extend({
    validateAllowAppointment: function (date, time) {
        const [hours, minutes] = time.split(':').map(Number);
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hours, minutes, 0);
        const today = new Date();
        const appointmentDateInArg = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
        const nowInArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);
        if (appointmentDateInArg < nowInArg) {
            throw new Error('No se pueden agendar las reservas en el pasado');
        }
        const diffMilliseconds = appointmentDate.getTime() - today.getTime();
        const diffInHours = diffMilliseconds / (1000 * 60 * 60); // ahora sí: horas reales
        if (diffInHours < 24) {
            throw new Error('Las reservas solo se pueden agendar con al menos 24 horas de anticipación');
        }
        const dayOfWeek = appointmentDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new Error('No se pueden agendar reservas los fines de semana');
        }
        if (hours < 14 || hours > 23) {
            throw new Error('las reservas son de 16:00 a 23:00 hs');
        }
    },
    validateExistingApointment: function (userId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentFround = yield this.findOne({
                where: {
                    user: { id: userId },
                    date: date,
                    time: time
                }
            });
        });
    }
});
