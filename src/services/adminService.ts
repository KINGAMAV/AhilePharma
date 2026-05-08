import { AppError, ErrorMessages } from '../utils/errorHandler';

const API_BASE = import.meta.env.VITE_API_URL || '';

async function request<T>(url: string, options: RequestInit, token: string): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let data: unknown = text;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    // keep raw text if not JSON
  }

  if (!response.ok) {
    const message = typeof data === 'object' && data && 'message' in data ? (data as any).message : response.statusText;
    throw new AppError(
      message || ErrorMessages.API_FAILURE,
      `API_${response.status}`,
      response.status >= 500 ? 'high' : 'medium',
    );
  }

  return data as T;
}

export async function getUsers(token: string) {
  if (!API_BASE) {
    return { users: [] };
  }

  return request<{ users: any[] }>(`${API_BASE}/admin/users`, { method: 'GET' }, token);
}

export async function getStats(token: string) {
  if (!API_BASE) {
    return {
      stats: {
        totalUsers: 0,
        patients: 0,
        doctors: 0,
        pharmacies: 0,
        clinics: 0,
        deliveries: 0,
      },
    };
  }

  return request<{
    stats: {
      totalUsers: number;
      patients: number;
      doctors: number;
      pharmacies: number;
      clinics: number;
      deliveries: number;
    };
  }>(`${API_BASE}/admin/stats`, { method: 'GET' }, token);
}

export async function deleteUser(token: string, userId: string) {
  if (!API_BASE) {
    return { message: 'Utilisateur supprimé.' };
  }

  return request<{ message: string }>(`${API_BASE}/admin/users/${userId}`, { method: 'DELETE' }, token);
}

export async function updateUserRole(token: string, userId: string, role: string) {
  if (!API_BASE) {
    return { user: {} };
  }

  return request<{ user: any }>(`${API_BASE}/admin/users/${userId}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  }, token);
}
