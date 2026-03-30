import { Router } from 'express';
import { getAppointments, registerAppointment, cancelAppointment, getAppointmentsById } from '../controllers/appointmentController';
import { checkAuth, checkAdmin } from '../middlewares/authMiddleware';


export const appointmentRouter : Router = Router();

// Protegida: Solo Admin ve lista completa
appointmentRouter.get('/', checkAuth, checkAdmin, getAppointments);

// Protegidas: Solo con sesión activa
appointmentRouter.get('/:id', checkAuth, getAppointmentsById);
appointmentRouter.post('/schedule', checkAuth, registerAppointment);
appointmentRouter.put('/cancel/:id', checkAuth, cancelAppointment);