import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function searchBar({...rest}){
  return(
    <View style= {styles.container}>
      <Text style= {styles.searchIcon}>🔍</Text>

      <TextInput
      style = {styles.input}
      placeholder = "Buscar por título ou autor..."
      placeholderTextColor= "#90989F"
      {...rest}
      >
      </TextInput>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',       // Coloca a lupa e o texto lado a lado
    alignItems: 'center',       // Centraliza os dois verticalmente
    backgroundColor: '#fff',    // Fundo branco como no seu design
    borderRadius: 25,           // Bordas bem arredondadas (pílula)
    borderWidth: 1,
    borderColor: '#e8e8e8',     // Uma borda sutil cinza claro
    marginHorizontal: 20,       // Afasta o componente das bordas laterais da tela
    marginVertical: 10,         // Afasta do Header (cima) e das abas (baixo)
    paddingHorizontal: 16,      // Espaçamento interno nas laterais
    height: 50,                 // Altura fixa para ficar confortável para o toque

    // Sombra leve para dar o efeito de elevação do seu design
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,               // Garante a sombra também no Android!
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,            // Empurra o TextInput um pouco para a direita
  },
  input: {
    flex: 1,                    // Faz o TextInput ocupar TODO o espaço restante da barra
    height: '100%',             // Ocupa toda a altura do container
    fontSize: 15,
    color: '#333',
  }
});