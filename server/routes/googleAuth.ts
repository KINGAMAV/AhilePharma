import { Router } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { findOrCreateGoogleUser } from '../services/googleAuthService';

const router = Router();

// Configuration de Passport Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/google/callback',
    },
    async (_accessToken, _refreshToken, profile: GoogleProfile, done) => {
      try {
        const result = await findOrCreateGoogleUser(profile);
        done(null, result);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Route pour initier l'authentification Google
router.get(
  '/auth',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route de callback après authentification Google
router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Récupérer les données d'authentification depuis le profil Passport
    const user = (req.user as any);
    if (user && user.token) {
      // Rediriger vers le frontend avec le token
      res.redirect(`/home?token=${user.token}&user=${encodeURIComponent(JSON.stringify(user.user))}`);
    } else {
      res.redirect('/login?error=auth_failed');
    }
  }
);

export default router;
