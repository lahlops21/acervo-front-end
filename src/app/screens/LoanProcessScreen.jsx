// screens/LoanProcessScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';
import BookCard from '../components/BookCard';
import UserCard from '../components/UserCard';

export default function LoanProcessScreen({ navigation }) {
  const [bookQuery, setBookQuery] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [step, setStep] = useState(1); // 1: Livro, 2: Usuário, 3: Botão
  const [success, setSuccess] = useState(false);

  const handleBookSearch = (text) => {
    setBookQuery(text);
    if (text.length > 0) setStep(2);
    else setStep(1);
  };

  const handleUserSearch = (text) => {
    setUserQuery(text);
    if (text.length > 0) setStep(3);
    else setStep(2);
  };

  const handleFinishLoan = () => {
    // Aqui no futuro dispararemos o POST para o banco Java
    setSuccess(true); // Ativa a nossa tela verdinha de sucesso!
  };

  // TELA DE SUCESSO CUSTOMIZADA
  if (success) {
    return (
      <SafeAreaView style={styles.successContainer}>
        <View style={styles.successCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={44} color="#10B981" />
          </View>
          
          <Text style={styles.successTitle}>Empréstimo Concedido!</Text>
          <Text style={styles.successSubtitle}>
            As informações foram salvas com sucesso no banco de dados do Acervo.me.
          </Text>

          <TouchableOpacity 
            style={styles.successBtn} 
            onPress={() => navigation.navigate('AdminDashboard')} // Volta para o painel limpo
          >
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
          <Ionicons name="arrow-back" size={20} color="#1E1B4B" 
          onPress={() => navigation.goBack()}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conceder Empréstimo</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* PASSO 1: BUSCA DO LIVRO */}
        <View style={styles.section}>
          <Text style={styles.instruction}>1. Informe o código do livro</Text>
          <CustomInput
            label="Código do Livro"
            placeholder="Ex: 978-0-14..."
            value={bookQuery}
            onChangeText={handleBookSearch}
            autoFocus
          />
        </View>

        {/* REVELAÇÃO DO LIVRO */}
        {step >= 2 && (
          <View style={styles.revealSection}>
            <View style={styles.cardHighlight}>
              <BookCard 
                title="Alice no País das Maravilhas"
                author="Lewis Carroll"
                bgColor="#FCD34D"
                isAvailable={true}
              />
            </View>

            {/* PASSO 2: BUSCA DO USUÁRIO */}
            <Text style={[styles.instruction, { marginTop: 30 }]}>2. Informe o ID do usuário</Text>
            <CustomInput 
              placeholder="Ex: LL-2024-01"
              value={userQuery}
              onChangeText={handleUserSearch}
            />
          </View>
        )}

        {/* REVELAÇÃO DO USUÁRIO E BOTÃO FINAL */}
        {step === 3 && (
          <View style={styles.revealSection}>
            <UserCard 
              name="João da Silva" 
              code="2551vhbhbfj38fw4" 
              isApt={true} 
            />

            <TouchableOpacity 
              style={styles.mainActionBtn}
              onPress={handleFinishLoan}
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