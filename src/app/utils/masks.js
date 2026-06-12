export const maskCPF = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

// 1. MÁSCARA PARA ISBN (Padrão de 13 dígitos: 978-65-5534-005-2)
// NOVA MÁSCARA ISBN CORRIGIDA (Padrão de 13 dígitos)
export const maskISBN = (value) => {
  if (!value) return "";
  
  // Remove tudo o que não for número primeiro
  const apenasNumeros = value.replace(/\D/g, "");
  
  // Vai aplicando os traços progressivamente conforme o usuário digita
  return apenasNumeros
    .replace(/^(\d{3})(\d)/, "$1-$2")
    .replace(/^(\d{3}-\d{2})(\d)/, "$1-$2")
    .replace(/^(\d{3}-\d{2}-\d{3})(\d)/, "$1-$2")
    .replace(/^(\d{3}-\d{2}-\d{3}-\d{4})(\d)/, "$1-$2")
    .substring(0, 17); // Garante o limite máximo de caracteres (13 números + 4 traços)
};

// 2. MÁSCARA PARA DATA (Padrão: DD/MM/AAAA)
export const maskDate = (value) => {
  if (!value) return "";

  return value
    .replace(/\D/g, "") // Remove tudo o que não for número
    .replace(/(\d{2})(\d)/, "$1/$2") // Adiciona a primeira barra após o dia
    .replace(/(\d{2})(\d)/, "$1/$2") // Adiciona a segunda barra após o mês
    .replace(/(\d{4})\d+?$/, "$1");  // Limita ao ano com 4 dígitos
};