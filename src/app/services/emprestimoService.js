import { api_metodos } from './api';

/*
    Endpoints do Acervo.me:
    POST /exemplar -> Cadastrar um novo livro no acervo
*/


export function registrarDevolucao(idEmprestimo) {
    return api_metodos.put(`/emprestimos/${idEmprestimo}/devolucao`);
}

// Busca usuário por código de identificação (Ex: 2026-TESTE)
export function pesquisarUsuarioPorCodigo(codigo) {
    return api_metodos.get(`/usuarios/pesquisa?codigo=${encodeURIComponent(codigo)}`);
}


// 👈 Removido o parâmetro ', token' daqui para evitar que chegue undefined
export function cadastrarEmprestimo(payloadEmprestimo) {
    // Pega o cabeçalho que o AuthContext já configurou de forma invisível no Axios
    return api_metodos.post('/emprestimos', payloadEmprestimo);
}
