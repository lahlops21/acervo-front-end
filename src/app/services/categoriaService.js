import { api_metodos } from './api';

// Bate na rota GET /categorias no CategoriaController
export function listarCategorias() {
    return api_metodos.get('/categorias');
}
