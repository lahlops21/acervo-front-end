import { StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

export default function CategoryTabs({ categories, selectedCategory, onSelectCategory }) {
  return (
    <FlatList
      data={categories} // Recebe a lista de gêneros (ex: ['Todos', 'Romance'...])
      horizontal={true}  // Faz a lista rolar para os lados e não para baixo
      showsHorizontalScrollIndicator={false} // Esconde aquela barra de rolagem feia
      contentContainerStyle={styles.listContainer} // Dá o espaçamento nas pontas da lista
      keyExtractor={(item) => item} // Usa o próprio texto como identificador único
      renderItem={({ item }) => {
        // Verifica se ESSA aba específica é a que o usuário clicou
        const isActive = item === selectedCategory;

        return (
          <TouchableOpacity
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onSelectCategory(item)} // Avisa a HomeScreen qual foi clicada
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20, // Alinha o início da lista com as bordas da tela
    marginVertical: 15,    // Dá um respiro entre a busca e a seleção de livros
    gap: 10,               // Dá um espacinho entre uma abinha e outra
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#8a5cf6', // O roxo do seu layout
    borderColor: '#8a5cf6',
  },
  tabText: {
    fontSize: 14,
    color: '#6b6e71',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',             // Texto fica branco quando ativo
    fontWeight: '600',
  },
});