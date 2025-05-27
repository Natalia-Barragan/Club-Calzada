import { Status } from "../interfaces/IAppointment";   
import { AppointmentRegisterDto } from "../dto/AppointmentDto";
import { getUserByIdService } from "./userServices";
import { Appointment } from "../entities/Appointment.entity";
import { AppointmentModel } from "../config/data-sources";



export const getAppointmentService = async (): Promise<Appointment[]> => {
    const appointments: Appointment[] = await AppointmentModel.find();
    if (appointments.length === 0) throw new Error("No hay turnos registrados");
    return appointments;
}

export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    const apponintmentFound = await AppointmentModel.findOne({where:{ id }});

    if (!apponintmentFound) throw new Error("EL turno con id ${id} no fue encontrado");
    return apponintmentFound;
}

export const registerAppointmentService = async (appointmentData: AppointmentRegisterDto): Promise<Appointment> => {
    // 1. Buscar si el usuario existe
   const user = await getUserByIdService(appointmentData.userId);

    // 2. Verificar si ya existe un turno para esa fecha, hora y usuario
    const existingAppointment = await AppointmentModel.findOne({
        where: {
            user: { id: appointmentData.userId },
            date: appointmentData.date,
            time: appointmentData.time
        },
    });

    if (existingAppointment) {
        throw new Error("Ya existe un turno para el usuario en esa fecha y hora");
    }

    // 3. Crear un nuevo turno
    const newAppointment = AppointmentModel.create({
        date: appointmentData.date,
        time: appointmentData.time,
        status: Status.active,
        user: user
    });

    // 4. Guardar el turno en la base de datos
    return await AppointmentModel.save(newAppointment);
};

// export const registerAppointmentService = async (appointmentData: AppointmentRegisterDto) : Promise<Appointment> => {    
//     const userFound = await getUserByIdService(appointmentData.userId);
   
//     const apponintmentFound = appointments.find(app =>
//         app.userId === appointmentData.userId &&
//         app.date === appointmentData.date &&
//         app.time === appointmentData.time
//     );

//     if (apponintmentFound) throw new Error("Ya existe un turno para el usuario en esa fecha y hora");
//     const newAppointment: Appointment | null = {
//         id: id++,
//         date: appointmentData.date,
//         time: appointmentData.time,
//         status: Status.active,
//         user: userFound
//     }
//     appointments.push(newAppointment);
//     return newAppointment;
// }

export const cancelAppointmentService = async (id: number): Promise<void> => {  
    
    const appointmentFound = await AppointmentModel.findOne({ where: { id } })
    if (!appointmentFound) throw new Error(`El turno con id ${id} no fue encontrado`);
    appointmentFound.status = Status.cancelled;
    await AppointmentModel.save(appointmentFound);
}   