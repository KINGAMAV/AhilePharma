import Joi from 'joi';
import User, { UserRole } from '../models/User';
import { hashPassword, comparePassword } from '../utils/password';
import { signToken } from '../utils/jwt';

interface AuthPayload {
  name?: string;
  email: string;
  password: string;
  role: UserRole;
}

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Patient', 'Doctor', 'Pharmacy', 'Clinic', 'Delivery').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('Patient', 'Doctor', 'Pharmacy', 'Clinic', 'Delivery').required(),
});

export function sanitizeUser(user: any) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
}

export async function registerUser(payload: AuthPayload) {
  const { error, value } = registerSchema.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { name, email, password, role } = value;

  const existing = await User.findOne({ email: email.toLowerCase(), role });
  if (existing) {
    throw new Error('Un compte existe déjà pour cet email et ce rôle.');
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
  return { token, user: sanitizeUser(user) };
}

export async function loginUser(payload: AuthPayload) {
  const { error, value } = loginSchema.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { email, password, role } = value;

  const user = await User.findOne({ email: email.toLowerCase(), role });
  if (!user) {
    throw new Error('Identifiants invalides.');
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error('Identifiants invalides.');
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { token, user: sanitizeUser(user) };
}

export async function logoutUser(_token: string) {
  // Pour une implémentation plus robuste, ajouter le token à une liste noire en BDD.
  // Pour l'instant, le logout côté client est suffisant pour invalider la session côté front.
  return { ok: true };
}

export async function getUserById(id: string) {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('Utilisateur introuvable.');
  }
  return sanitizeUser(user);
}
