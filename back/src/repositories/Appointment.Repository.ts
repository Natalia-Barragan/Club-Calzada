import {  AppDataSource } from "../config/data-sources";
import { Appointment } from "../entities/Appointment.entity";

export const AppointmentRepository =  AppDataSource.getRepository(Appointment).extend({

    validateAllowAppointment:  function(date: Date, time: string):void {

        const [hours, minutes] = time.split(':').map(Number);
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hours, minutes, 0);
        const today = new Date();

        const appointmentDateInArg = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
        const nowInArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);

        if(appointmentDateInArg < nowInArg) {
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

        if(hours < 14 || hours > 23) {
            throw new Error('las reservas son de 16:00 a 23:00 hs');
        }
    },

    validateExistingApointment: async function(userId: number, date: Date, time: string): Promise<void> {
        const appointmentFround = await this.findOne({
            where:{
            user: {id: userId},
            date: date,
            time: time
            }
        })

        if (appointmentFround) {
            throw new Error(`La reserva con fecha ${date} y hora ${time} ya existe para este usuario`);
        }
    }
});
