import { createContext, useState } from "react";
import { api } from "../services/api";

export const API_URL = 'http://192.168.0.106:8080'; // Ajustado para o IP local/emulador do seu PC

let tokenJwt = null; 

export function setToken(token) {
  tokenJwt = token;
  // 🚀 Injeta o token direto no cabeçalho global do Axios
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log("[AUTH] Token JWT injetado no Axios com sucesso!");
  }
}

export function clearToken() {
  tokenJwt = null;
  // Limpa o token do Axios ao deslogar
  delete api.defaults.headers.common['Authorization']; 
}

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Função centralizadora de Login que o botão do formulário vai acionar
  const loginContext = async (email, senha) => {
    try {
      const dadosResposta = await request('POST', '/auth/login', { email, senha });
      
      if (dadosResposta && dadosResposta.token) {
        setToken(dadosResposta.token); // Grava na variável global do arquivo
        // salva também o código e o nome (ou e-mail) no estado global
        setUsuario({ 
          id: dadosResposta.id,
          email: dadosResposta.email, 
          role: dadosResposta.role,
          codigo: dadosResposta.codigo // 👈 Salva o código do leitor na memória do app
        });
        return dadosResposta;
      }
    } catch (error) {
      throw new Error(error.message || "Falha ao autenticar");
    }
  };

  const logoutContext = () => {
    clearToken();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
}

// Função request
export async function request(method, path, body = null) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000); // Cancela após 10s

  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    signal: controller.signal
  };

  // Se o usuário já estiver logado, anexa o cabeçalho Bearer exigido pelo JwtAuthFilter do Java!
  if (tokenJwt) {
    config.headers['Authorization'] = `Bearer ${tokenJwt}`;
  }

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${path}`, config);
    clearTimeout(timer);

    if (!response.ok) {
      const textoErro = await response.text();
      throw new Error(textoErro || "Erro na requisição");
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timer);
    throw error;
  }
}