import { api } from '../api/api';

/* =========================
   INTERFACES
========================= */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  name: string;
  role: 'SUPORTE' | 'CLIENTE' | 'ADMIN';
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/* =========================
   AUTH SERVICES
========================= */

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    '/auth/login',
    data
  );

  return response.data;
}

export async function register(
  data: RegisterRequest
) {
  return api.post('/auth/register', data);
}

export async function registerSuporte(
  data: RegisterRequest
) {
  return api.post('/auth/register/suporte', data);
}
