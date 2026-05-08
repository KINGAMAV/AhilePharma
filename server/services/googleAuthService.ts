import User from '../models/User';
import { signToken } from '../utils/jwt';
import { sanitizeUser } from './authService';

interface GoogleProfile {
  id: string;
  displayName: string;
  emails?: Array<{ value: string }>;
  photos?: Array<{ value: string }>;
}

export async function findOrCreateGoogleUser(profile: GoogleProfile) {
  const email = (profile.emails?.[0]?.value || `google-${profile.id}@example.com`).toLowerCase();
  const name = profile.displayName;
  const avatar = profile.photos?.[0]?.value || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2AC1C8&color=ffffff`;

  // Chercher l'utilisateur existant par email (tous les rôles)
  let user = await User.findOne({ email });

  if (!user) {
    // Créer un nouvel utilisateur avec le rôle Patient par défaut
    user = await User.create({
      name,
      email,
      password: 'google-oauth-' + profile.id, // Mot de passe fictif pour les utilisateurs OAuth
      role: 'Patient',
      avatar,
    });
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { token, user: sanitizeUser(user) };
}
