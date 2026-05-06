import { Router } from 'express';
import User, { UserRole } from '../models/User';
import { hashPassword, comparePassword } from '../utils/password';
import { signToken, verifyToken } from '../utils/jwt';

const router = Router();

interface AuthPayload {
  name?: string;
  email: string;
  password: string;
  role: UserRole;
}

function sanitizeUser(user: any) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
}

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body as AuthPayload;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, mot de passe et rôle sont requis.' });
  }

  const user = await User.findOne({ email: email.toLowerCase(), role });
  if (!user) {
    return res.status(401).json({ message: 'Identifiants invalides.' });
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Identifiants invalides.' });
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return res.json({ token, user: sanitizeUser(user) });
});

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body as AuthPayload;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const existing = await User.findOne({ email: email.toLowerCase(), role });
  if (existing) {
    return res.status(409).json({ message: 'Un compte existe déjà pour cet email et ce rôle.' });
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2AC1C8&color=ffffff`,
  });

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return res.status(201).json({ token, user: sanitizeUser(user) });
});

router.post('/logout', (_req, res) => {
  return res.json({ ok: true });
});

router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }
    return res.json({ user: sanitizeUser(user) });
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
});

export default router;
