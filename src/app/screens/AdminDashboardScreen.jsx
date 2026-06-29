// screens/AdminDashboardScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import LoanCard from '../components/LoanCard';
import QuickAction from '../components/QuickAction';
import { useNavigation } from '@react-navigation/native';

export default function AdminDashboardScreen() {
  const navigation = useNavigation();
  // Dados mockados para os empréstimos recentes
  const emprestimosRecentes = [
    { id: 1, name: 'Maria Silva', bookTitle: 'Alice no País das Maravilhas', status: 'Atrasado', statusColor: '#ef4444', badgeBg: '#FEE2E2', badgeText: '#991B1B' },
    { id: 2, name: 'João Pereira', bookTitle: 'Sidarta', status: 'Ativo', statusColor: '#3b82f6', badgeBg: '#DBEAFE', badgeText: '#1E40AF' },
    { id: 3, name: 'Ana Costa', bookTitle: 'O Senhor dos Anéis', status: 'Vence hoje', statusColor: '#f59e0b', badgeBg: '#FEF3C7', badgeText: '#92400E' },
    { id: 4, name: 'Carlos Lima', bookTitle: 'Porta Giratória', status: 'Devolvido', statusColor: '#10b981', badgeBg: '#D1FAE5', badgeText: '#065F46' },
  ];
  const handleLogout = () => {
    // reseta a pilha e joga o usuário direto para a Home dos livros
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }], 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER ESCURO / ROXO FECHADO */}
        <View style={styles.header}>
        {/* Botão de Logout */}
        <View style={styles.topBar}>
        
    
    {/* BOTÃO DE LOGOUT */}
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Ionicons name="log-out-outline" size={22} color="#CBC3E3" />
      <Text style={styles.logoutText}>Sair</Text>
    </TouchableOpacity>
  </View>

  <Text style={styles.greetingTitle}>Bem-vinda de volta,</Text>
  <Text style={styles.adminName}>Bibliotecária Ana 👋</Text>

          {/* LINHA DE MÉTRICAS */}
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <View style={[styles.metricDot, { backgroundColor: '#3b82f6' }]} />
              <Text style={styles.metricNumber}>12</Text>
              <Text style={styles.metricLabel}>Ativos</Text>
            </View>

            <View style={styles.metricCard}>
              <View style={[styles.metricDot, { backgroundColor: '#ef4444' }]} />
              <Text style={styles.metricNumber}>3</Text>
              <Text style={styles.metricLabel}>Atrasados</Text>
            </View>

            <View style={styles.metricCard}>
              <View style={[styles.metricDot, { backgroundColor: '#10b981' }]} />
              <Text style={styles.metricNumber}>47</Text>
              <Text style={styles.metricLabel}>Devolvidos</Text>
            </View>
          </View>
        </View>

        {/* CONTEÚDO PRINCIPAL COMPORTANDO AS AÇÕES */}
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>AÇÕES RÁPIDAS</Text>
          <View style={styles.grid}>
  <QuickAction
    title="Cadastrar Livro"
    subtitle="Novo título"
    iconName="book-outline"
    iconColor="#0369A1"
    iconBgColor="#E0F2FE"
    onPress={() => navigation.navigate('AddBook')}
  />

  <QuickAction
    title="Gerenciar Acervo"
    subtitle="Editar / excluir"
    iconName="bank-outline"
    iconFamily="Material"
    iconColor="#475569"
    iconBgColor="#F1F5F9"
    onPress={() => navigation.navigate('ManageCollection')}
  />

  <QuickAction
    title="Conceder Empréstimo"
    subtitle="Registrar saída"
    iconName="heart-outline"
    iconColor="#B45309"
    iconBgColor="#FEF3C7"
    onPress={() => navigation.navigate('LoanProcess')}
  />

  <QuickAction
    title="Ver Empréstimos"
    subtitle="Todos os status"
    iconName="clipboard-outline"
    iconColor="#065F46"
    iconBgColor="#D1FAE5"
    onPress={() => navigation.navigate('LoansList')}
  />
</View>
          

          {/* LISTA DE EMPRÉSTIMOS RECENTES */}
          <Text style={[styles.sectionTitle, { marginTop: 15 }]}>EMPRÉSTIMOS RECENTES</Text>
          {emprestimosRecentes.map((item) => (
            <LoanCard
              key={item.id}
              name={item.name}
              bookTitle={item.bookTitle}
              status={item.status}
              statusColor={item.statusColor}
              badgeBg={item.badgeBg}
              badgeText={item.badgeText}
            />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Um fundo falso sutil
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6
  },
  logoutText: {
    color: '#CBC3E3',
    fontSize: 13,
    fontWeight: '600'
  },
  
  header: {
    backgroundColor: '#2E1A47', // Roxo escuro do seu design
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  timeText: { color: '#fff', fontSize: 14, fontWeight: '600', marginBottom: 20 },
  greetingTitle: { color: '#CBC3E3', fontSize: 16, fontWeight: '500' },
  adminName: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginTop: 4, marginBottom: 25 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  metricCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
  },
  metricDot: { width: 6, height: 6, borderRadius: 3, position: 'absolute', top: 12, left: 12 },
  metricNumber: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 4 },
  metricLabel: { color: '#CBC3E3', fontSize: 12, marginTop: 2 },
  body: { padding: 24 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#94a3b8', letterSpacing: 1, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, marginBottom: 20 },
  actionButton: {
    width: '47%', // Garante duas colunas alinhadas
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  iconWrapper: { width: 45, height: 45, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  actionTitle: { fontSize: 15, fontWeight: 'bold', color: '#00213d', marginBottom: 4 },
  actionSubtitle: { fontSize: 12, color: '#94a3b8' },
});