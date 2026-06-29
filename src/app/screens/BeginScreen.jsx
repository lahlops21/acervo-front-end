import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonForm from "../components/ButtonForm";

export default function BeginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Deixa a barra de status combinando com o fundo roxo escuro da parte de cima */}
      <StatusBar barStyle="light-content" backgroundColor="#4c2ca7" />
      
      {/* Metade de cima: Identidade Visual e Logo */}
      <View style={styles.topSection}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoIcon}>📚</Text>
        </View>
        <Text style={styles.brandName}>Acervo.me</Text>
        <Text style={styles.brandSub}>GERENCIADOR DE ACERVOS</Text>
      </View>

      {/* Metade de baixo: O Card Branco Flutuante com os botões */}
      <View style={styles.bottomCard}>
        <Text style={styles.welcomeTitle}>Sua biblioteca{"\n"}na palma da mão</Text>
        
        <Text style={styles.welcomeSubtitle}>
          Acesse o acervo, consulte disponibilidade e acompanhe seus empréstimos onde estiver.
        </Text>

        <View style={styles.buttonGroup}>
          {/* Rota para o LoginScreen */}
          <ButtonForm 
            textButton="Entrar na conta" 
            variant="primary" 
            onPress={() => navigation.navigate("LoginScreen")} 
          />
          
          {/* Rota para o RegisterScreen */}
          <ButtonForm 
            textButton="Criar conta grátis" 
            variant="secondary" 
            onPress={() => navigation.navigate("RegisterScreen")} 
          />

          {/* Divisor "ou" discreto */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.line} />
          </View>

          {/* Rota para a HomeScreen direto, sem autenticação */}
          <TouchableOpacity 
            onPress={() => navigation.navigate("HomeScreen")}
            activeOpacity={0.6}
          >
            <Text style={styles.noLoginText}>Explorar acervo sem login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c2ca7", // Roxo escuro de fundo para a parte de cima
  },
  topSection: {
    flex: 4, // Ocupa a parte superior proporcionalmente
    justifyContent: "center",
    alignItems: "center",
  },
  logoBadge: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Quadrado translúcido igual ao Figma
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 40,
  },
  brandName: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    fontFamily: "System",
  },
  brandSub: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.6)",
    letterSpacing: 2,
    marginTop: 4,
  },
  bottomCard: {
    flex: 5, // Ocupa a parte inferior onde ficam as ações
    backgroundColor: "#FAF9F6", // O Off-White oficial do seu projeto!
    borderTopLeftRadius: 40, // Curva acentuada linda nas pontas superiores
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#00213d", // Seu azul escuro padrão
    textAlign: "center",
    lineHeight: 32,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#6b6e71",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  buttonGroup: {
    width: "100%",
    marginTop: 35,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    width: "80%",
    alignSelf: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e8e8e8",
  },
  dividerText: {
    color: "#a0a5aa",
    paddingHorizontal: 10,
    fontSize: 13,
  },
  noLoginText: {
    color: "#6b6e71",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  }
});