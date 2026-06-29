import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import CategoryTabs from "../components/CategoryTabs";
import BookCard from "../components/BookCard";
import { listarLivros, pesquisarLivros } from "../services/livroService"; 

export default function HomeScreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const generos = ['Todos', 'Disponíveis', 'Romance', 'Ficção', 'Biografia', 'Terror'];
  const [generoSelecionado, setGeneroSelecionado] = useState('Todos');
  
  // Estados para controlar a API
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Gerencia a listagem e a pesquisa em tempo real com Debounce (espera 500ms)
  useEffect(() => {
    // Se o usuário limpou o campo de busca, volta a carregar todos os livros do banco
    if (busca.trim() === '') {
      carregarLivrosDoBackEnd();
      return;
    }

    // Se houver texto digitado, aguarda o usuário pausar a digitação para não travar a API
    const dispararPesquisa = setTimeout(async () => {
      try {
        setCarregando(true);
        const resposta = await pesquisarLivros(busca); // Bate no @GetMapping("/pesquisa") do Java
        setLivros(resposta.data); 
      } catch (erro) {
        console.warn("Erro ao pesquisar livros no servidor:", erro);
      } finally {
        setCarregando(false);
      }
    }, 500);

    return () => clearTimeout(dispararPesquisa); // Cancela o timer se o usuário digitar outra letra rápido
  }, [busca]);


  const carregarLivrosDoBackEnd = async () => {
    try {
      setCarregando(true);
      const resposta = await listarLivros();
      setLivros(resposta.data); // Resposta vinda do @GetMapping do Spring Boot
    } catch (erro) {
      console.warn("Erro ao buscar livros do servidor:", erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>

        <SearchBar 
        value={busca} 
        onChangeText={(text) => setBusca(text)} />
        
        <CategoryTabs
          categories={generos}
          selectedCategory={generoSelecionado}
          onSelectCategory={(categoriaClicada) => setGeneroSelecionado(categoriaClicada)}
        />

        <View style={styles.placeholderContainer}>
          <Text style={styles.sectionTitle}>Nossa Seleção</Text>

          {carregando ? (
            <ActivityIndicator size="large" color="#00213d" style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.booksGrid}>
              {livros.map((livro) => (
                <BookCard
                  key={livro.idLivro} // 👈 Mapeado com "idLivro" 
                  title={livro.titulo} // 👈 Mapeado com "titulo" 
                  
                  //  Pega a lista de strings dos autores e junta por vírgulas
                  author={livro.nomesAutores && livro.nomesAutores.length > 0 
                    ? livro.nomesAutores.join(', ') 
                    : "Autor Desconhecido"}
                  
                  emoji="📚" // Emojis estáticos temporários 
                  
                  //  Verifica se o status retornado do Enum é "DISPONIVEL"
                  isAvailable={livro.statusDisponibilidade === "DISPONIVEL"} 
                  
                  bgColor="#60a5fa" // Cor de fundo padrão para os cards
                  
                  // Repassa o objeto do livro inteiro para a tela de detalhes utilizar em português
                  onPress={() => navigation.navigate('BookDetailScreen', { bookData: livro })}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  placeholderContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#00213d',
    marginBottom: 15,
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});
