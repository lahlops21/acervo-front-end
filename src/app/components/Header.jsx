import React, { useContext } from 'react'; 
import { View, Text, StyleSheet, Alert } from 'react-native';
import ProfileAvatar from './ProfileAvatar'; 
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext'; 

export default function Header() {
  const navigation = useNavigation();
  
  //  Puxa os dados do usuário logado e a função de logout do contexto 
  const { usuario, logoutContext } = useContext(AuthContext); 

  // Pega as primeiras letras do e-mail ou nome para fazer as iniciais 
  const obterIniciais = () => {
    if (!usuario?.email) return "??";
    return usuario.email.substring(0, 2).toUpperCase();
  };

  const handleAvatarPress = () => {
    // 👈 Verifica no contexto se a Role salva é de Administrador
    const isAdmin = usuario?.role === 'ROLE_ADMIN';

    if (isAdmin) {
      // Janela customizada para o Bibliotecário
      Alert.alert(
        "Painel do Administrador",
        `Olá, ${usuario?.email}\nDeseja ir para o painel de controle?`,
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Ir para o Dashboard", onPress: () => navigation.navigate('AdminDashboard') }, // 👈 Atalho direto
          { 
            text: "Sair do App", 
            style: "destructive", 
            onPress: () => {
              logoutContext();
              navigation.reset({ index: 0, routes: [{ name: 'BeginScreen' }] });
            } 
          }
        ]
      );
    } else {
      // Janela padrão do Leitor (Exibe o código do leitor que o bibliotecário precisa)
      Alert.alert(
        "Minha Conta",
        `E-mail: ${usuario?.email || 'Não informado'}\n\nSeu Código de Leitor:\n${usuario?.codigo || 'Sem código'}`,
        [
          { text: "Fechar", style: "cancel" },
          { 
            text: "Sair do App", 
            style: "destructive", 
            onPress: () => {
              logoutContext();
              navigation.reset({ index: 0, routes: [{ name: 'BeginScreen' }] });
            } 
          }
        ]
      );
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.logoText}>Acervo.me</Text>
      
      <View style={styles.rightActions}>
        <Text style={styles.bellIcon}>🔔</Text> 
        
        <ProfileAvatar 
          isLogged={!!usuario} // Fica true se o usuário estiver preenchido no contexto
          initials={obterIniciais()} // Exibe as iniciais
          onPress={handleAvatarPress} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',                 
    justifyContent: 'space-between',      
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,                              
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00213d',
  },
  bellIcon: {
    fontSize: 18,
  }
});
