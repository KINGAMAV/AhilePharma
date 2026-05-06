import { User } from '../stores/authStore';
import { AppError, ErrorMessages } from '../utils/errorHandler';

export interface LoginPayload {
  email: string;
  password: string;
  role: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

const API_BASE = import.meta.env.VITE_API_URL || '';

async function request<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
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

export async function loginRequest(payload: LoginPayload): Promise<AuthResponse> {
  if (!API_BASE) {
    return mockAuth(payload);
  }

  return request<AuthResponse>(`${API_BASE}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function registerRequest(payload: LoginPayload): Promise<AuthResponse> {
  if (!API_BASE) {
    return mockAuth(payload);
  }

  return request<AuthResponse>(`${API_BASE}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function logoutRequest(token: string): Promise<void> {
  if (!API_BASE) {
    return Promise.resolve();
  }

  await request<void>(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function mockAuth(payload: LoginPayload): Promise<AuthResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'mock-jwt-token-123456',
        user: {
          id: 'mock-user-id',
          name: payload.name || (payload.role === 'Patient' ? 'Patient Test' : `${payload.role} Test`),
          email: payload.email,
          role: payload.role as User['role'],
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
        },
      });
    }, 700);
  });
}
