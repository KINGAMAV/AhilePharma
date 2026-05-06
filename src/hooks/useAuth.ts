import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest, registerRequest } from '../services/authService';
import { useAuthStore, type User } from '../stores/authStore';
import { useToast } from '../contexts/ToastContext';

interface AuthHookReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (email: string, password: string, role: string, name: string) => Promise<void>;
  logout: () => void;
}

export function useAuth(): AuthHookReturn {
  const navigate = useNavigate();
  const toast = useToast();
  const { user, isAuthenticated, login: setLogin, logout: setLogout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginRequest({ email, password, role });
      setLogin(response.user, response.token);
      toast.addToast('Connexion réussie', 'success');
      if (role === 'Patient') {
        navigate('/home');
      } else {
        navigate(`/dashboards/${role.toLowerCase()}`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur de connexion';
      setError(message);
      toast.addToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, role: string, name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await registerRequest({ email, password, role });
      setLogin(response.user, response.token);
      toast.addToast('Inscription réussie', 'success');
      navigate('/home');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'inscription';
      setError(message);
      toast.addToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout: setLogout,
  };
}
