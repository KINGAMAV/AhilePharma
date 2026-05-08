import jwt from 'jsonwebtoken';
import { UserRole } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-dev-key'; // À changer en production !
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d';

if (process.env.NODE_ENV === 'production' && JWT_SECRET === 'super-secret-dev-key') {
  console.warn('ATTENTION: Le secret JWT par défaut est utilisé en production. Changez-le immédiatement !');
}

export interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as any);
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
