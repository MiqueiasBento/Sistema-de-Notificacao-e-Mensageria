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

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('🚀 Request:', config.method?.toUpperCase(), config.url);
    console.log('📦 Data:', config.data);
    console.log('🔑 Token:', token ? 'Presente ✅' : 'Ausente ❌');

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

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
