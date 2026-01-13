import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    const publicRoutes = ['/auth/login', '/auth/register'];

    const isPublicRoute = publicRoutes.some((route) =>
      config.url?.includes(route)
    );

    if (token && !isPublicRoute) {
      config.headers?.set('Authorization', `Bearer ${token}`);
    }

    return config;
  });

/* =========================
   RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url);
    console.log('📨 Data:', response.data);
    return response;
  },
  (error) => {
    console.error('💥 Response Error:', error.response?.status);
    console.error('🧨 Error Data:', error.response?.data);
    return Promise.reject(error);
  }
);