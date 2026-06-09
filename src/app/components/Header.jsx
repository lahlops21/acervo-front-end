import { View, Text, StyleSheet } from 'react-native';
import ProfileAvatar from './ProfileAvatar'; // <-- Importando o filho!

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      {/* Lado Esquerdo: Nome do App */}
      <Text style={styles.logoText}>Acervo.me</Text>
      
      {/* Lado Direito: Botões de Ação */}
      <View style={styles.rightActions}>
        <Text style={styles.bellIcon}>🔔</Text> {/* Ícone de notificação */}
        
        {/* Usando o componente Filho aqui dentro! */}
        <ProfileAvatar 
          isLogged={true} 
          initials="LL" 
          onPress={() => console.log("Abriu o perfil!")} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',                 // Coloca os elementos lado a lado
    justifyContent: 'space-between',      // Empurra o logo para a esquerda e as ações para a direita
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,                              // Dá um espacinho entre o sininho e o avatar
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00213d',
  }
});