import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ManageBookCard from '../components/ManageBookCard';
import { listarLivros, excluirLivro, pesquisarLivros } from '../services/livroService'; 
import { useNavigation } from '@react-navigation/native';

export default function ManageCollectionScreen({ navigation }) {
 
  const [busca, setBusca] = useState('');
  
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // 👈 EFECT PRINCIPAL: Escuta o foco e gerencia a busca/listagem com o banco
  useEffect(() => {
    // Listener para recarregar quando a tela ganha foco (ex: ao voltar da edição)
    const unsubscribe = navigation.addListener('focus', () => {
      if (busca.trim() === '') {
        carregarAcervoDoBackEnd();
      }
    });

    // Lógica do Debounce: se o usuário digitar, espera 500ms antes de ir no banco
    if (busca.trim() === '') {
      carregarAcervoDoBackEnd();
    } else {
      const dispararPesquisa = setTimeout(async () => {
        try {
          setCarregando(true);
          const resposta = await pesquisarLivros(busca); // Bate no seu @GetMapping("/pesquisa") do Java
          setLivros(resposta.data);
        } catch (erro) {
          console.warn("Erro ao pesquisar acervo no back-end:", erro);
        } finally {
          setCarregando(false);
        }
      }, 500);

      return () => {
        clearTimeout(dispararPesquisa);
        unsubscribe();
      };
    }

    return unsubscribe;
  }, [navigation, busca]); 
  const carregarAcervoDoBackEnd = async () => {
    try {
      setCarregando(true);
      const resposta = await listarLivros();
      setLivros(resposta.data); 
    } catch (erro) {
      console.warn("Erro ao listar acervo para gerenciamento:", erro);
      Alert.alert("Erro", "Não foi possível carregar os livros do servidor.");
    } finally {
      setCarregando(false);
    }
  };


  const handleDelete = (idLivro, titulo) => {
    Alert.alert(
      "Excluir Obra",
      `Tem certeza que deseja apagar "${titulo}" e todos os seus exemplares em cascata do acervo?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: async () => {
            try {
              // 1. Executa a deleção na API do Spring Boot
              await excluirLivro(idLivro);
              
              // 2. Remove o livro do estado local para sumir da tela instantaneamente
              setLivros(prevLivros => prevLivros.filter(livro => livro.idLivro !== idLivro));
              
              // 3. Avisa o usuário do sucesso
              Alert.alert("Sucesso", "Livro e seus exemplares foram removidos definitivamente!");
            } catch (erro) {
              console.warn("Erro ao excluir livro do back-end:", erro);
              Alert.alert("Erro", "Não foi possível excluir o livro. Verifique a conexão com o servidor.");
            }
          } 
        }
      ]
    );
  };

  const filtrados = livros.filter(l => 
    l.titulo?.toLowerCase().includes(busca.toLowerCase()) || 
    (l.nomesAutores && l.nomesAutores.join(' ').toLowerCase().includes(busca.toLowerCase())) ||
    l.isbn?.includes(busca)
  );
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Superior */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Gerenciar Acervo</Text>
      </View>

      {/* Campo de Busca */}
      <View style={styles.searchSection}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.inputSearch}
            placeholder="Buscar por título, autor, ISBN..."
            placeholderTextColor="#a0a5aa"
            value={busca}
            onChangeText={setBusca}
          />
          <TouchableOpacity style={styles.searchIconBadge}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de Sub-informações */}
      <View style={styles.infoMetaRow}>
        <Text style={styles.countText}>
          <Text style={styles.countNumber}>{filtrados.length}</Text> livros cadastrados
        </Text>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderText}>⇅ Ordenar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista Rolável dos Itens */}
      {carregando ? (
        // Mostra uma animação de carregamento enquanto consome a API do Java
        <ActivityIndicator size="large" color="#8a5cf6" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
          {filtrados.map((livro) => (
            <ManageBookCard 
              key={livro.idLivro} // Mapeado com idLivro do DTO
              title={livro.titulo} // Mapeado com titulo do DTO
              
              //  Junta os autores em texto se houver mais de um
              author={livro.nomesAutores && livro.nomesAutores.length > 0 
                ? livro.nomesAutores.join(', ') 
                : "Autor Desconhecido"}
              
              emoji="📚" //  temporário 
              
              //  Monta a string baseada nos dados do Spring Boot
              copiesText={livro.quantidadeExemplares > 0 
                ? `${livro.quantidadeExemplares} no acervo` 
                : 'Indisponível'}
                           
              categories={livro.categorias && livro.categorias.length > 0 ? livro.categorias : ["Geral"]} 
              bgColor="#bca6f7" 
              
              onEdit={() => navigation.navigate('AddBook', { bookData: livro })}
              onDelete={() => handleDelete(livro.idLivro, livro.titulo)}
            />
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 10 },
  backButton: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e8e8e8' },
  backArrow: { fontSize: 20, color: '#00213d', fontWeight: '600' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#00213d' },
  searchSection: { paddingHorizontal: 24, marginTop: 15 },
  searchWrapper: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 18, borderWidth: 1.5, borderColor: '#e8e8e8', alignItems: 'center', paddingHorizontal: 16, height: 54 },
  inputSearch: { flex: 1, fontSize: 14, color: '#00213d' },
  searchIconBadge: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#bca6f7', justifyContent: 'center', alignItems: 'center' },
  searchIcon: { fontSize: 16 },
  infoMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginTop: 20, marginBottom: 12 },
  countText: { fontSize: 14, color: '#6b6e71', fontWeight: '500' },
  countNumber: { fontWeight: '700', color: '#00213d' },
  orderButton: { flexDirection: 'row', alignItems: 'center' },
  orderText: { fontSize: 14, color: '#8a5cf6', fontWeight: '600' },
  scrollList: { flex: 1, paddingHorizontal: 24 }
});
