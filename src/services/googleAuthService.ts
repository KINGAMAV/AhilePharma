const API_BASE = import.meta.env.VITE_API_URL || '';

export function initiateGoogleAuth() {
  if (!API_BASE) {
    console.warn('API_BASE non configurée, impossible de lancer Google OAuth');
    return;
  }

  // Rediriger vers le backend pour initier l'authentification Google
  window.location.href = `${API_BASE}/google/auth`;
}

export function handleGoogleCallback() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const userStr = params.get('user');

  if (token && userStr) {
    try {
      const user = JSON.parse(decodeURIComponent(userStr));
      return { token, user };
    } catch (error) {
      console.error('Erreur lors du parsing du callback Google:', error);
      return null;
    }
  }

  return null;
}
