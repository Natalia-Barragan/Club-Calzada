import { Request, Response } from 'express';
import { AppointmentRegisterDto } from '../dto/AppointmentDto';
import { getAppointmentService, getAppointmentByIdService, registerAppointmentService, cancelAppointmentService } from '../services/appointmentServices';
import {IAppointment} from '../interfaces/IAppointment';
import { matchesGlob } from 'path';

export const getAppointments = async (req: Request, res: Response) => {
   try{
    const appointments: IAppointment[] = await getAppointmentService();
    res.status(200).json({
        message: 'Lista de turnos',
        data: appointments
    });
   } catch (error) {
    res.status(500).json({ message: 'Ocurrio un error', error: error instanceof Error ? error.message : 'Error desconocido' });
   }
};

export const getAppointmentsById = async (req: Request <{id: string}>, res: Response): Promise<void> => {
    try{
        const appointmentFound: IAppointment = await getAppointmentByIdService(parseInt(req.params.id, 10));
        res.status(200).json({
            message: 'Turno encontrado',
            data: appointmentFound
        });
    } catch (error) {
        res.status(500).json({ message: 'Ocurrio un error', error: error instanceof Error ? error.message : 'Error desconocido' });
    }
};

export const registerAppointment = async (req: Request <unknown, unknown, AppointmentRegisterDto>, res: Response): Promise<void>=> {
    try{
        const newAppointment: IAppointment = await registerAppointmentService(req.body);
        res.status(201).json({
            message: 'Turno creado',
            data: newAppointment
        });
    } catch (error) {
        res.status(500).json({ message: 'Ocurrio un error', error: error instanceof Error ? error.message : 'Error desconocido' });
    }
};

export const cancelAppointment = async (req: Request <{id: string}>, res: Response): Promise<void> => {
    try{
        await cancelAppointmentService(parseInt(req.params.id, 10));
        res.status(200).json({msg: 'Cita cancelada'});
    } catch (error) {
        res.status(500).json({ message: 'Ocurrio un error', error: error instanceof Error ? error.message : 'Error desconocido' }); 
    }
};
