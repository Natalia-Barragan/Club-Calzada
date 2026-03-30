import { Status } from "../interfaces/IAppointment";
import { AppointmentRegisterDto } from "../dto/AppointmentDto";
import { getUserByIdService } from "./userServices";
import { Appointment } from "../entities/Appointment.entity";
import { getAppointmentRepository } from "../repositories/Appointment.Repository";




export const getAppointmentService = async (): Promise<Appointment[]> => {
    return await getAppointmentRepository().find({
        relations: ['user']
    });
}

export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    const apponintmentFound = await getAppointmentRepository().findOne({ where: { id } });

    if (!apponintmentFound) throw new Error(`La reserva con id ${id} no fue encontrado`);
    return apponintmentFound;
}

export const registerAppointmentService = async (appointmentData: AppointmentRegisterDto): Promise<Appointment> => {

    const user = await getUserByIdService(appointmentData.userId);
    
    // REGLA DE ORO: Si el socio no está al día (deudor), no puede reservar.
    if (user && !user.active) {
        throw new Error('No puedes reservar porque tienes pagos pendientes. Por favor, regulariza tu situación en administración.');
    }

    getAppointmentRepository().validateAllowAppointment(appointmentData.date, appointmentData.time);

    await getAppointmentRepository().validateExistingApointment(appointmentData.userId, appointmentData.date, appointmentData.time);

    const newAppointment = getAppointmentRepository().create({
        date: appointmentData.date,
        time: appointmentData.time,
        description: appointmentData.description,
        user: {
            id: appointmentData.userId
        },
    })

    return await getAppointmentRepository().save(newAppointment);
};

export const cancelAppointmentService = async (id: number): Promise<void> => {

    const appointmentFound = await getAppointmentRepository().findOne({ where: { id } })

    if (!appointmentFound) throw new Error(`La reserva con id ${id} no fue encontrado`);
    appointmentFound.status = Status.cancelled;
    await getAppointmentRepository().save(appointmentFound);
}   