/// screens/LoanProcessScreen.jsx
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';
import BookCard from '../components/BookCard';
import UserCard from '../components/UserCard';
import { pesquisarLivros } from '../services/livroService';
import { pesquisarUsuarioPorCodigo, cadastrarEmprestimo } from '../services/emprestimoService'; 
import { AuthContext } from '../context/authContext'; // Importante para pegar o ID do Administrador logado

export default function LoanProcessScreen({ navigation }) {
  const { usuario } = useContext(AuthContext); // Resgata os dados do admin logado

  const [bookQuery, setBookQuery] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [step, setStep] = useState(1); // 1: ISBN, 2: ID Usuário, 3: Finalizar
  const [success, setSuccess] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // Estados para armazenar os dados dinâmicos do banco
  const [livroEncontrado, setLivroEncontrado] = useState(null);
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);

  // 🔍 DEBOUNCE 1: Busca automática do Livro por ISBN (Corrigida)
  useEffect(() => {
    // Aguarda ter pelo menos 4 caracteres para não bombardear o banco à toa
    if (bookQuery.trim().length < 4) { 
      setLivroEncontrado(null);
      if (step > 1) setStep(1);
      return;
    }

    const timerLivro = setTimeout(async () => {
      try {
        setCarregando(true);
        const resposta = await pesquisarLivros(bookQuery); 
        
        // 🚀 CORREÇÃO CRÍTICA: Se a lista veio preenchida do Java, extraímos a posição 0
        if (resposta.data && resposta.data.length > 0) {
          setLivroEncontrado(resposta.data[0]); // 👈 Extrai o objeto do livro de dentro do array list!
          setStep(2); // Avança para o passo do ID do usuário
        } else {
          setLivroEncontrado(null);
        }
      } catch (erro) {
        console.warn("Erro ao buscar livro por ISBN:", erro);
        setLivroEncontrado(null);
      } finally {
        setCarregando(false);
      }
    }, 600);

    return () => clearTimeout(timerLivro);
  }, [bookQuery]);

  // 🔍 DEBOUNCE 2: Busca automática do Usuário por Código
  useEffect(() => {
    if (userQuery.trim().length < 4) {
      setUsuarioEncontrado(null);
      if (step > 2) setStep(2);
      return;
    }

    const timerUsuario = setTimeout(async () => {
      try {
        setCarregando(true);
        const resposta = await pesquisarUsuarioPorCodigo(userQuery); // Bate na busca por código do leitor
        if (resposta.data) {
          setUsuarioEncontrado(resposta.data);
          setStep(3); // Mostra o card do usuário e o botão finalizar
        }
      } catch (erro) {
        setUsuarioEncontrado(null);
      } finally {
        setCarregando(false);
      }
    }, 600);

    return () => clearTimeout(timerUsuario);
  }, [userQuery]);

  // 🔄 ENVIO REAL PARA O SPRING BOOT
  const handleFinishLoan = async () => {
    if (!livroEncontrado || !usuarioEncontrado) return;

    // Regra de validação preventiva no Front-end
    if (usuarioEncontrado.status !== "DISPONIVEL") {
      Alert.alert("Empréstimo Recusado", "Este leitor possui pendências ou um empréstimo ativo.");
      return;
    }

    try {
      setCarregando(true);

      const payload = {
        idUsuario: usuarioEncontrado.id, 
        idExemplar: livroEncontrado.idLivro, 
        idAdmin: usuario?.id || 1 
      };

      console.log("[EMPRÉSTIMO] Enviando payload definitivo:", payload);

      // 🚀 CORREÇÃO: Chame a função passando apenas o seu payload. 
      // O token já está injetado de forma invisível nos cabeçalhos pelo seu loginContext!
      await cadastrarEmprestimo(payload);
      
      setSuccess(true); // 👈 Ativa a maravilhosa tela verde de sucesso!

    } catch (error) {
      // 🚀 EXIBE O ERRO REAL DEVOLVIDO PELO TOMCAT NO SEU TERMINAL:
      if (error.response) {
        console.warn("[MÁGICA] Status do Java:", error.response.status);
        console.warn("[MÁGICA] Mensagem do Java:", JSON.stringify(error.response.data));
      } else {
        console.warn("[MÁGICA] Erro sem resposta:", error.message);
      }
      Alert.alert("Erro", "Não foi possível conceder o empréstimo.");
    }
  }

  if (success) {
    return (
      <SafeAreaView style={styles.successContainer}>
        <View style={styles.successCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={44} color="#10B981" />
          </View>
          <Text style={styles.successTitle}>Empréstimo Concedido!</Text>
          <Text style={styles.successSubtitle}>
            As informações foram salvas com sucesso no banco de dados do Acervo.me. O estoque do livro foi atualizado.
          </Text>
          <TouchableOpacity style={styles.successBtn} onPress={() => navigation.navigate('AdminDashboard')}>
            <Text style={styles.successBtnText}>Voltar ao Painel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#1E1B4B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conceder Empréstimo</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* PASSO 1: BUSCA DO LIVRO */}
        <View style={styles.section}>
          <Text style={styles.instruction}>1. Informe o ISBN do livro</Text>
          <CustomInput
            label="ISBN"
            placeholder="Ex: 978-65-534..."
            value={bookQuery}
            onChangeText={setBookQuery}
            autoFocus
          />
        </View>

        {carregando && <ActivityIndicator size="small" color="#8a5cf6" style={{ marginVertical: 10 }} />}

        {/* REVELAÇÃO DO LIVRO DINÂMICO */}
        {step >= 2 && livroEncontrado && (
          <View style={styles.revealSection}>
            <View style={styles.cardHighlight}>
              <BookCard 
                title={livroEncontrado.titulo}
                author={livroEncontrado.nomesAutores?.join(', ') || "Autor Desconhecido"}
                bgColor="#FCD34D"
                isAvailable={livroEncontrado.quantidadeExemplares > 0}
              />
            </View>

            {/* PASSO 2: BUSCA DO USUÁRIO */}
            <Text style={[styles.instruction, { marginTop: 30 }]}>2. Informe o Código de Identificação do leitor</Text>
            <CustomInput 
              placeholder="Ex: 2026-ABCD"
              value={userQuery}
              onChangeText={setUserQuery}
            />
          </View>
        )}

        {/* REVELAÇÃO DO USUÁRIO DINÂMICO E BOTÃO FINAL */}
        {step === 3 && usuarioEncontrado && (
          <View style={styles.revealSection}>
            <UserCard 
              name={usuarioEncontrado.nome} 
              code={usuarioEncontrado.codigo} 
              isApt={usuarioEncontrado.status === "DISPONIVEL"} 
            />

            <TouchableOpacity 
              style={[styles.mainActionBtn, usuarioEncontrado.status !== "DISPONIVEL" && { backgroundColor: '#cbd5e1' }]}
              onPress={handleFinishLoan}
              disabled={usuarioEncontrado.status !== "DISPONIVEL"}
            >
              <Ionicons name="checkmark-circle" size={24} color="#FFF" />
              <Text style={styles.mainActionText}>Finalizar Empréstimo</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#F1F5F9' 
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1E1B4B' },
  scrollContent: { padding: 24 },
  instruction: { fontSize: 13, fontWeight: '800', color: '#8B5CF6', letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' },
  section: { marginBottom: 20 },
  cardHighlight: { padding: 10, backgroundColor: '#FFF', borderRadius: 24, borderWidth: 1, borderColor: '#F1F5F9' },
  revealSection: { marginTop: 10 },
  mainActionBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
    backgroundColor: '#2E1A47', padding: 20, borderRadius: 24, marginTop: 40,
    shadowColor: '#2E1A47', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#FAF9F6', // O mesmo fundinho off-white do app
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 32,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // Sombra suave
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E6F4EA', // Verde bem clarinho de fundo do ícone
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1B4B', // Nosso roxo escuro
    marginBottom: 12,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  successBtn: {
    backgroundColor: '#10B981', // Botão verde vibrante de sucesso
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
  successBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  mainActionText: { color: '#FFF', fontSize: 18, fontWeight: '700' }
});