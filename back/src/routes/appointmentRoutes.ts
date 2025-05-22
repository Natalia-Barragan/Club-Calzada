import {Router} from 'express';
import { getAppointments, registerAppointment, cancelAppointment, getAppointmentsId } from '../controllers/appointmentController';


export const appointmentRouter : Router = Router();

appointmentRouter.get('/', getAppointments);

appointmentRouter.get('/:id', getAppointmentsId);

appointmentRouter.post('/register', registerAppointment);

appointmentRouter.delete('/cancel', cancelAppointment);