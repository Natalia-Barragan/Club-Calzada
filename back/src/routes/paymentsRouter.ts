import { Router } from 'express';
import { createPayment, getPaymentsByUser } from '../controllers/paymentController';
import { checkAuth, checkAdmin } from '../middlewares/authMiddleware';

const paymentsRouter = Router();

// Protegidas: Solo el Admin puede cobrar o ver historial de socios
paymentsRouter.post('/', checkAuth, checkAdmin, createPayment);
paymentsRouter.get('/user/:userId', checkAuth, checkAdmin, getPaymentsByUser);

export { paymentsRouter };
