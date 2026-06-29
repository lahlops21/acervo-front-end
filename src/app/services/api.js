import axios from "axios";
import { Platform } from "react-native";

// Ajuste automático do IP com base no ambiente (Emulador Android ou iOS/Físico)
const getBaseURL = () => {
  if (Platform.OS === 'android') {
    return 'http://192.168.0.106'; // Localhost do PC visto pelo emulador Android
  }
  return 'http://localhost:8080';  // Localhost padrão para iOS
};

// Instância do axios
export const api = axios.create({
  baseURL: 'http://192.168.0.106:8080', 
  timeout: 8000, 
  headers: { 'Content-Type': 'application/json' }, 
});

// Interceptador para exibir logs organizados das requisições no terminal
api.interceptors.request.use(config => {
  console.log(`[AXIOS] ${config.method.toUpperCase()} ${config.url}`);
  return config; 
});

// Interceptador para capturar erros de resposta de forma amigável
api.interceptors.response.use(
  response => response, 
  error => { 
    console.warn('[AXIOS] Erro: ', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// Métodos disponíveis simplificados diretamente com a instância da api
export const api_metodos = {
  get: (path) => api.get(path),
  post: (path, body) => api.post(path, body),
  put: (path, body) => api.put(path, body),
  delete: (path) => api.delete(path),
};