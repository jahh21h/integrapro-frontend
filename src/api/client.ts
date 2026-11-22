import axios, { AxiosError } from 'axios';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'https://app.integrapro.app/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000
});

// Interceptor para inyectar token de autenticación de Sanctum y Tenant Header (Multi-Empresa)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('integrapro_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const activeEmpresaId = localStorage.getItem('integrapro_active_empresa_id');
  if (activeEmpresaId) {
    config.headers['X-Empresa-ID'] = activeEmpresaId;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor de respuesta con manejo de errores unificado
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Sesión expirada
      console.warn('Sesión no autorizada o expirada en el backend.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
