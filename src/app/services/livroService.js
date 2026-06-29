import { api_metodos } from './api';

/*
    Endpoints do Acervo.me:
    POST /exemplar -> Cadastrar um novo livro no acervo
*/

export function cadastrarLivro(dadosDoLivro) {
    // Envia os dados para o Spring Boot usando a estrutura padrão do professor
    return api_metodos.post('/exemplares', dadosDoLivro);
}

export function listarLivros() {
    return api_metodos.get('/livros');
}

export function excluirLivro(idLivro) {
    // Realiza o DELETE /livros/{id} do Controller
    return api_metodos.delete(`/livros/${idLivro}`);
}

export function atualizarLivro(dadosAtualizacao) {
    // Bate na rota @PutMapping do seu LivroController
    return api_metodos.put('/livros', dadosAtualizacao);
}

export function pesquisarLivros(termo) {
    // Passa o termo dinamicamente como Query Param (?termo=texto)
    return api_metodos.get(`/livros/pesquisa?termo=${encodeURIComponent(termo)}`);
}