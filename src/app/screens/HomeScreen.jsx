import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, StyleSheet, Text} from "react-native";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import CategoryTabs from "../components/CategoryTabs";
import BookCard from "../components/BookCard";

export default function HomeScreen({navigation}){
  const [busca, setBusca] = useState('');
  // 1. Sua lista de gêneros oficial baseada no seu design!
  const generos = ['Todos', 'Disponíveis', 'Romance', 'Ficção', 'Biografia', 'Terror'];
  // 2. Estado para saber qual gênero está selecionado (começa com 'Todos')
  const [generoSelecionado, setGeneroSelecionado] = useState('Todos');
  return(
    <SafeAreaView style={styles.container}>
      <Header/>
      <ScrollView showsVerticalScrollIndicator={false}>
               
      <SearchBar value={busca} onChangeText={(text) => setBusca(text)}/>
      <CategoryTabs 
          categories={generos}
          selectedCategory={generoSelecionado}
          onSelectCategory={(categoriaClicada) => setGeneroSelecionado(categoriaClicada)}
        />

      <View style={styles.placeholderContainer}>
      
      <Text style={styles.sectionTitle}>Nossa Seleção</Text>
  
      <View style={styles.booksGrid}>
    
    {[
      { 
    id: 1, 
    title: 'Alice no País das Maravilhas', 
    author: 'Lewis Carroll', 
    emoji: '🐱', 
    isAvailable: true, 
    color: '#fcd34d', 
    categories: ["Fantasia", "Clássico"],
    publishedAt: "1865",
    publisher: "Macmillan",
    copies: "3 livres",
    isbn: "978-0-14-143328",
    synopsis: "Alice no País das Maravilhas narra a jornada de uma jovem que, ao seguir um Coelho Branco, mergulha em um universo surreal onde a lógica é subvertida por personagens excêntricos e situações absurdas.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/8166Inp9JYL.jpg"
  },
  { 
    id: 2, 
    title: 'Sidarta', 
    author: 'Herman Hesse', 
    emoji: '🌊', 
    isAvailable: true, 
    color: '#60a5fa', 
    categories: ["Filosofia", "Romance"],
    publishedAt: "1922",
    publisher: "S. Fischer",
    copies: "2 livres",
    isbn: "978-8-50-101153",
    synopsis: "A história da busca espiritual de um homem indiano pela iluminação durante o tempo do Buda Gautama.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/817t04wOxxL.jpg"
  }, 
  { 
  id: 3, 
  title: 'O Despertar da Força', 
  author: 'George Lucas', 
  emoji: '⚔️', 
  isAvailable: false, 
  color: '#4b5563', 
  categories: ["Ficção", "Aventura"],
  publishedAt: "2015",
  publisher: "Lucasfilm",
  copies: "0 livros",
  isbn: "978-8-55-534005",
  synopsis: "Trinta anos após a derrota de Darth Vader e do Império, uma nova ameaça surge. Rey, uma catadora de sucata, e Finn, um stormtrooper desertor, juntam-se à Resistência para encontrar Luke Skywalker, o último Jedi sobrevivente.",
  cover: "https://images-na.ssl-images-amazon.com/images/I/919N1K7vSFL.jpg"
},
{ 
  id: 4, 
  title: 'Porta Giratória', 
  author: 'Roberto Freire', 
  emoji: '🚪', 
  isAvailable: true, 
  color: '#ca8a04', 
  categories: ["Literatura", "Drama"],
  publishedAt: "1983",
  publisher: "Guanabara",
  copies: "1 livro",
  isbn: "978-8-50-102431",
  synopsis: "Uma obra marcante da literatura brasileira que discute as relações humanas, a liberdade e as barreiras psicológicas da sociedade através de uma narrativa envolvente e reflexiva.",
  cover: "https://images-na.ssl-images-amazon.com/images/I/41Nq-b6Xv7L.jpg"
}
].map((livro) => (
  <BookCard 
    key={livro.id}
    title={livro.title}
    author={livro.author}
    emoji={livro.emoji}
    isAvailable={livro.isAvailable}
    bgColor={livro.color}
    // Garanta que você está passando o objeto "livro" inteiro aqui!
    onPress={() => navigation.navigate('BookDetailScreen', { bookData: livro })}
  />
        
      
    ))}
  </View>
</View>
      </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  placeholderContainer: {
    paddingHorizontal: 20, // Dá o mesmo alinhamento das abas e da busca!
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
})