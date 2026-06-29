import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from "react-native";
import ButtonForm from "../components/ButtonForm";
import LabeledInput from "../components/LabeledInput";
import { request } from "../context/authContext";
import { cadastrarNovoUsuario } from "../services/authService";

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState(""); 
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const handleRegister = async () => {
    // 1. Validações básicas de segurança na interface
    if (!nome.trim() || !email.trim() || !cpf.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmaSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    // 2. Mude o bloco do try dentro da função handleRegister:
try {
  const payload = {
    nome: nome,
    email: email,
    cpf: cpf.replace(/\D/g, ""), 
    senhaRaw: senha, 
    telefone: telefone,
    endereco: endereco
  };

  console.log("[CADASTRO] Enviando via AXIOS para:", payload.email);

  // 🚀 Chamamos a função do seu arquivo authService que usa o Axios (ele já está na porta :8080!)
  await cadastrarNovoUsuario(payload); 

  Alert.alert(
    "Sucesso!", 
    "Sua conta de leitor foi criada com sucesso! Faça login para acessar o acervo.",
    [{ text: "Entrar", onPress: () => navigation.navigate("LoginScreen") }]
  );

} catch (error) {
  // 👈 O AXIOS VAI TE DIZER O ERRO REAL AQUI NO CONSOLE:
  console.warn("Erro real retornado pelo Spring Boot:", error.response?.data || error.message);
  Alert.alert("Erro ao cadastrar", error.response?.data || "Verifique as informações digitadas.");
}
};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4c2ca7" />
      
      {/* Topo Roxo Reduzido para dar espaço ao formulário maior */}
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
          <Text style={styles.welcomeTitle}>Criar sua conta</Text>
          <Text style={styles.welcomeSubtitle}>Preencha os dados abaixo para começar.</Text>

          <View style={styles.form}>
            <LabeledInput 
              label="Nome" 
              placeholder="João Silva"
              value={nome}
              onChangeText={setNome}
            />

            <LabeledInput 
              label="E-mail" 
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* 👈 NOVO INPUT: Captura o CPF obrigatório para salvar no HeidiSQL */}
            <LabeledInput 
              label="CPF" 
              placeholder="123.456.789-00"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              maxLength={14}
            />

            <LabeledInput 
              label="Telefone" 
              placeholder="(11) 99999-9999"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />

            <LabeledInput 
              label="Endereço" 
              placeholder="Rua, nº, Bairro, Cidade"
              value={endereco}
              onChangeText={setEndereco}
            />
            
            <LabeledInput 
              label="Senha" 
              placeholder="Mínimo 8 caracteres"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={true}
            />

            <LabeledInput 
              label="Confirmar Senha" 
              placeholder="Repita a senha"
              value={confirmaSenha}
              onChangeText={setConfirmaSenha}
              secureTextEntry={true}
            />
          </View>

          <ButtonForm 
            textButton="Cadastrar" 
            variant="primary" 
            onPress={handleRegister} 
          />

          {/* Rodapé direcionando para login */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Já possui cadastro? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.footerLink}>Fazer Login!</Text>
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
    flex: 2.5, // Levemente menor para acomodar o scroll confortavelmente
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  logoBadge: {
    width: 55,
    height: 55,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  logoIcon: {
    fontSize: 26,
  },
  brandName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  brandSub: {
    fontSize: 8,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.6)",
    letterSpacing: 2,
    marginTop: 2,
  },
  bottomCard: {
    flex: 7.5,
    backgroundColor: "#FAF9F6",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
  },
  scrollContent: {
    paddingTop: 35,
    paddingBottom: 40,
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
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
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