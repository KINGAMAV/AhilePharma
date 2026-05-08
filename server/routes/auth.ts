import { Router } from 'express';
import { registerUser, loginUser, getUserById } from '../services/authService';
import { verifyToken } from '../utils/jwt';

const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const { token, user } = await loginUser({ email, password, role });
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const { token, user } = await registerUser({ name, email, password, role });
    res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (_req, res) => {
  // Le logout côté serveur n'invalide pas le JWT, il est géré côté client.
  // Pour une invalidation côté serveur, une liste noire de tokens serait nécessaire.
  res.json({ ok: true });
});

router.get('/me', async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token manquant.' });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    const user = await getUserById(payload.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
