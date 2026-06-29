import { api_metodos } from './api';

// Envia e-mail e senha pura para a API autenticar e devolver o JWT
export function realizarLogin(email, senha) {
    return api_metodos.post('/auth/login', { email, senha });
}

// Cadastra um novo leitor/usuário comum no sistema
export function cadastrarNovoUsuario(dadosUsuario) {
    return api_metodos.post('/usuarios', dadosUsuario);
}
