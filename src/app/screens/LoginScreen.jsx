import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from "react-native";
import ButtonForm from "../components/ButtonForm";
import LabeledInput from "../components/LabeledInput";
import { AuthContext } from '../context/authContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { usuario, loginContext } = useContext(AuthContext);
  const [carregando, setCarregando] = useState(false); 
  const [ocultarSenha, setOcultarSenha] = useState(true);
  const [perfil, setPerfil] = useState('leitor'); // Começa como leitor padrão
  
  
  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      setCarregando(true);
      
      console.log(`[AUTH] Solicitando login na API para:`, email);
      
      // 🚀 1. Executa o login. O contexto vai bater no Java, pegar o JWT e atualizar o estado "usuario" na memória do app
      await loginContext(email, senha);
      
      // 🚀 2. Como o estado mudou, agora o React sabe EXATAMENTE quem está logado de forma segura!
      // Se você marcou a Tab como "Bibliotecário" ou se o e-mail for o do administrador geral
      if (email.trim().toLowerCase() === 'admin@acervo.me') {
        Alert.alert("Sucesso", "Painel administrativo liberado!");
        navigation.navigate('AdminDashboard'); // Vai direto para o seu Dashboard
      } else {
        Alert.alert("Sucesso", "Bem-vindo ao Acervo.me!");
        navigation.navigate('HomeScreen'); // Leitores vão para a vitrine
      }

    } catch (erro) {
      console.warn("Erro detalhado ao autenticar:", erro.message);
      Alert.alert("Erro de Autenticação", "E-mail ou senha incorretos. Verifique suas credenciais.");
    } finally {
      setCarregando(false);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4c2ca7" />
      
      {/* Topo Roxo Idêntico ao BeginScreen */}
      <View style={styles.topSection}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoIcon}>📚</Text>
        </View>
        <Text style={styles.brandName}>Acervo.me</Text>
        <Text style={styles.brandSub}>GERENCIADOR DE ACERVOS</Text>
      </View>

      {/* Card de Formulário Branco */}
      <View style={styles.bottomCard}>
        <ScrollView 
          style={{ width: '100%' }} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.welcomeTitle}>Bem-vinda de volta 👋</Text>
          <Text style={styles.welcomeSubtitle}>Entre com suas credenciais para continuar.</Text>

          <View style={styles.form}>
            <LabeledInput 
              label="E-mail" 
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            
            <LabeledInput 
              label="Senha" 
              placeholder="••••••••"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={true}
            />

            <TouchableOpacity style={styles.forgetContainer}>
              <Text style={styles.forgetText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>

          {/* Botão com o novo componente estilizado */}
          <ButtonForm 
            textButton="Entrar" 
            variant="primary" 
            onPress={handleLogin} 
          />

          {/* Rodapé direcionando para cadastro */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Não tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
              <Text style={styles.footerLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c2ca7",
  },
  topSection: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  logoBadge: {
    width: 65,
    height: 65,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  logoIcon: {
    fontSize: 32,
  },
  brandName: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  brandSub: {
    fontSize: 9,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.6)",
    letterSpacing: 2,
    marginTop: 2,
  },
  bottomCard: {
    flex: 7,
    backgroundColor: "#FAF9F6",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
  },
  scrollContent: {
    paddingTop: 35,
    paddingBottom: 30,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#00213d",
    alignSelf: "flex-start",
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#6b6e71",
    alignSelf: "flex-start",
    marginTop: 4,
    marginBottom: 25,
  },
  form: {
    width: "100%",
    marginBottom: 20,
  },
  forgetContainer: {
    alignSelf: "flex-end",
    marginTop: 2,
  },
  forgetText: {
    color: "#8a5cf6",
    fontSize: 13,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#6b6e71",
    fontSize: 14,
  },
  footerLink: {
    color: "#8a5cf6",
    fontSize: 14,
    fontWeight: "700",
  }
});