import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  User,
  Stethoscope,
  Pill,
  Building2,
  Truck,
  ChevronLeft,
} from 'lucide-react';
import { UserRole } from '../types';
import { useAuth } from '../hooks/useAuth';

const roles: { role: UserRole; label: string; icon: any }[] = [
  { role: 'Patient', label: 'Patient', icon: User },
  { role: 'Doctor', label: 'Médecin', icon: Stethoscope },
  { role: 'Pharmacy', label: 'Pharmacie', icon: Pill },
  { role: 'Clinic', label: 'Clinique', icon: Building2 },
  { role: 'Delivery', label: 'Livreur', icon: Truck },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('Patient');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password, selectedRole);
    } else {
      await register(email, password, selectedRole, name);
    }
  };

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold mb-2">
          {isLogin ? 'Bon retour !' : 'Créez votre compte'}
        </h1>
        <p className="text-slate-500">Choisissez votre rôle et identifiez-vous.</p>
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-6 scrollbar-hide mb-4">
        {roles.map(({ role, label, icon: Icon }) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`flex flex-col items-center justify-center min-w-[80px] h-24 rounded-2xl border-2 transition-all ${
              selectedRole === role
                ? 'border-primary bg-primary/5 text-primary scale-105'
                : 'border-slate-100 text-slate-400 opacity-60'
            }`}
          >
            <Icon size={28} />
            <span className="text-[10px] mt-2 font-bold uppercase tracking-wider">{label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        {!isLogin && (
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={name}
              onChange={event => setName(event.target.value)}
              placeholder="Nom complet"
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              required
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Email ou téléphone"
            className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Mot de passe"
            className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            required
          />
        </div>

        {isLogin && (
          <div className="flex justify-end">
            <button type="button" className="text-sm font-medium text-primary">
              Mot de passe oublié ?
            </button>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700 mb-4">
            {error}
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full h-14 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/20 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Patientez...' : isLogin ? 'Se connecter' : "S'inscrire"}
        </motion.button>
      </form>

      <div className="mt-8 text-center">
        <button onClick={() => setIsLogin(!isLogin)} className="text-slate-500 text-sm">
          {isLogin ? "Vous n'avez pas de compte ? " : 'Vous avez déjà un compte ? '}
          <span className="text-primary font-bold">{isLogin ? "S'inscrire" : 'Se connecter'}</span>
        </button>
      </div>

      <div className="mt-auto pt-10 flex flex-col items-center space-y-4">
        <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">
          Ou continuer avec
        </span>
        <div className="flex space-x-6">
          <button className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-6 h-6"
              alt="Google"
            />
          </button>
          <button className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
            <img
              src="https://www.svgrepo.com/show/475638/apple-color.svg"
              className="w-6 h-6"
              alt="Apple"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
