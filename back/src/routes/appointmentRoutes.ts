import {Router} from 'express';
import { getAppointments, registerAppointment, cancelAppointment, getAppointmentsById } from '../controllers/appointmentController';


export const appointmentRouter : Router = Router();

appointmentRouter.get('/', getAppointments);

appointmentRouter.get('/:id', getAppointmentsById);

appointmentRouter.post('/schedule', registerAppointment);

appointmentRouter.put('/cancel/:id', cancelAppointment);