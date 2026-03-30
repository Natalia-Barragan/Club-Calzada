import { Request, Response } from 'express';
import { getUserModel, getPaymentModel } from '../config/data-sources';
import { Payment } from '../entities/Payment.entity';
import { User } from '../entities/User.entity';

export const createPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, amount, month, concept } = req.body;

        const user = await getUserModel().findOneBy({ id: userId });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        const paymentRepository = getPaymentModel();
        const newPayment = paymentRepository.create({
            amount,
            month,
            concept: concept || 'Cuota Social',
            user: user
        });

        await paymentRepository.save(newPayment);

        // FORZAR: Actualizar estado del socio a Al Día (active: true) directamente para mayor confiabilidad
        await getUserModel().update(userId, { active: true });

        res.status(201).json({
            message: 'Pago registrado correctamente',
            data: newPayment
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al registrar el pago',
            error: error instanceof Error ? error.message : 'Unknown'
        });
    }
};

export const getPaymentsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const paymentRepository = getPaymentModel();
        
        const payments = await paymentRepository.find({
            where: { user: { id: userId } },
            order: { paymentDate: 'DESC' }
        });

        res.status(200).json({
            message: 'Historial de pagos',
            data: payments
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener pagos',
            error: error instanceof Error ? error.message : 'Unknown'
        });
    }
};
