import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/jwt';
import { UserRole } from '../models/User';

// Extension du type Request pour ajouter un utilisateur authentifié
declare global {
  namespace Express {
    interface Request {
      authUser?: TokenPayload;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token manquant.' });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    req.authUser = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide.' });
  }
}

export function authorize(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.authUser) {
      res.status(401).json({ message: 'Authentification requise.' });
      return;
    }

    if (!roles.includes(req.authUser.role)) {
      res.status(403).json({ message: 'Accès refusé. Rôle insuffisant.' });
      return;
    }

    next();
  };
}
