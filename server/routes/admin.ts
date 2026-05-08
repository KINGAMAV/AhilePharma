import { Router } from 'express';
import User from '../models/User';
import { authenticate, authorize } from '../middleware/rbac';

const router = Router();

// Middleware pour protéger les routes admin
router.use(authenticate);

// Récupérer tous les utilisateurs (Admin uniquement)
router.get('/users', authorize('Doctor', 'Pharmacy', 'Clinic', 'Delivery'), async (_req, res, next) => {
  try {
    const users = await User.find({}, '-password').lean();
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

// Récupérer les statistiques des utilisateurs
router.get('/stats', authorize('Doctor', 'Pharmacy', 'Clinic', 'Delivery'), async (_req, res, next) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      patients: await User.countDocuments({ role: 'Patient' }),
      doctors: await User.countDocuments({ role: 'Doctor' }),
      pharmacies: await User.countDocuments({ role: 'Pharmacy' }),
      clinics: await User.countDocuments({ role: 'Clinic' }),
      deliveries: await User.countDocuments({ role: 'Delivery' }),
    };
    res.json({ stats });
  } catch (error) {
    next(error);
  }
});

// Supprimer un utilisateur (Admin uniquement)
router.delete('/users/:id', authorize('Doctor', 'Pharmacy', 'Clinic', 'Delivery'), async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
      return;
    }
    res.json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    next(error);
  }
});

// Mettre à jour le rôle d'un utilisateur
router.patch('/users/:id/role', authorize('Doctor', 'Pharmacy', 'Clinic', 'Delivery'), async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['Patient', 'Doctor', 'Pharmacy', 'Clinic', 'Delivery'].includes(role)) {
      res.status(400).json({ message: 'Rôle invalide.' });
      return;
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
      return;
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
