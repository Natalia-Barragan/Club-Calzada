import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/envs';

const JWT_SECRET = config.JWT_SECRET;

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'No hay token de sesión. Prohibido el paso.' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado. Iniciá sesión de nuevo.' });
        return;
    }
};

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (user && user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
        return;
    }
};
