import { Status } from "../interfaces/IAppointment";   
import { AppointmentRegisterDto } from "../dto/AppointmentDto";
import { getUserByIdService } from "./userServices";
import { Appointment } from "../entities/Appointment.entity";
import { AppointmentRepository } from "../repositories/Appointment.Repository";




export const getAppointmentService = async (): Promise<Appointment[]> => {
   return await AppointmentRepository.find();
}

export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    const apponintmentFound = await AppointmentRepository.findOne({where:{ id }});

    if (!apponintmentFound) throw new Error(`La reserva con id ${id} no fue encontrado`);
    return apponintmentFound;
}

export const registerAppointmentService = async (appointmentData: AppointmentRegisterDto): Promise<Appointment> => {
   
    await getUserByIdService(appointmentData.userId);

    AppointmentRepository.validateAllowAppointment( appointmentData.date, appointmentData.time);

    await AppointmentRepository.validateExistingApointment(appointmentData.userId, appointmentData.date, appointmentData.time);

    const newAppointment = AppointmentRepository.create({
        date: appointmentData.date,
        time: appointmentData.time,
        user: {
            id: appointmentData.userId
        },
    })
    
    return await AppointmentRepository.save(newAppointment);
};

export const cancelAppointmentService = async (id: number): Promise<void> => {  
    
    const appointmentFound = await AppointmentRepository.findOne({ where: { id } })

    if (!appointmentFound) throw new Error(`La reserva con id ${id} no fue encontrado`);
    appointmentFound.status = Status.cancelled;
    await AppointmentRepository.save(appointmentFound);
}   