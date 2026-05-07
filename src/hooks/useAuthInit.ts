import { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authService';
import { useAuthStore } from '../stores/authStore';
import { useToast } from '../contexts/ToastContext';

export function useAuthInit() {
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);
  const toast = useToast();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function init() {
      if (!token) {
        setIsReady(true);
        return;
      }

      if (user) {
        setIsReady(true);
        return;
      }

      try {
        const response = await getCurrentUser(token);
        if (!active) return;
        login(response.user, token);
      } catch (error) {
        if (active) {
          logout();
          const message = error instanceof Error ? error.message : 'Impossible de récupérer l\'utilisateur.';
          toast.addToast(message, 'error');
        }
      } finally {
        if (active) {
          setIsReady(true);
        }
      }
    }

    init();

    return () => {
      active = false;
    };
  }, [token, user, login, logout, toast]);

  return isReady;
}
