import { IAppointment, Status } from "../interfaces/IAppointment";   
import { AppointmentRegisterDto } from "../dto/AppointmentDto";
import { getUserByIdService } from "./userServices";

const appointments : IAppointment[] = [];

let id: number = 1;

export const getAppointmentService = async (): Promise<IAppointment[]> => {
    return appointments;
}

export const getAppointmentByIdService = async (id: number): Promise<IAppointment> => {
    const apponintmentFound = appointments.find(app => app.id === id);

    if (!apponintmentFound) throw new Error("EL turno con id ${id} no fue encontrado");
    return apponintmentFound;
}

export const registerAppointmentService = async (appointmentData: AppointmentRegisterDto) : Promise<IAppointment> => {    
    const userFound = await getUserByIdService(appointmentData.userId);
   
    const apponintmentFound = appointments.find(app => app.userId === appointmentData.userId && app.time === appointmentData.time && new Date(app.date).getTime() === new Date(appointmentData.date).getTime());

    if (apponintmentFound) throw new Error("Ya existe un turno para el usuario en esa fecha y hora");
    const newAppointment: IAppointment = {
        id: id++,
        date: appointmentData.date,
        time: appointmentData.time,
        status: Status.active,
        userId: userFound?.id || 0
    }
    appointments.push(newAppointment);
    return newAppointment;
}

export const cancelAppointmentService = async (id: number): Promise<void> => {  
    const appointmentFound = await getAppointmentByIdService(id);
    appointmentFound.status = Status.cancelled;
}   