import { Router } from 'express';
import { createPayment, getPaymentsByUser } from '../controllers/paymentController';

export const paymentRouter: Router = Router();

paymentRouter.post('/', createPayment);
paymentRouter.get('/user/:userId', getPaymentsByUser);
