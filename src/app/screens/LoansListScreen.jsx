import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoanCard from '../components/LoanCard';

export default function LoansListScreen({ navigation }) {
  // Filtros disponíveis de acordo com o protótipo
  const [filtroAtivo, setFiltroAtivo] = useState('ATRASADO'); // ATRASADO, ATIVO, DEVOLVIDO

  // Simulação dos dados de empréstimo integrados ao seu banco
  const dadosEmprestimos = [
    {
      id: 1,
      title: 'Alice no País das Maravilhas',
      author: 'Lewis Carroll',
      borrower: 'Ana Lima',
      emoji: '🐱',
      status: 'ATRASADO',
      daysText: '5 dias em atraso',
      deadlineText: '06/06/2026',
      sidebarColor: '#eb5757',
      badgeBg: '#fcd34d',
    },
    {
      id: 2,
      title: 'O Despertar da Força Negra',
      author: 'Timothy Zahn',
      borrower: 'Pedro Ramos',
      emoji: '⚔️',
      status: 'ATRASADO',
      daysText: '2 dias em atraso',
      deadlineText: '09/06/2026',
      sidebarColor: '#eb5757',
      badgeBg: '#374151',
    },
    {
      id: 3,
      title: 'A Lebre com Olhos de Âmbar',
      author: 'Edmund de Waal',
      borrower: 'Carla Sousa',
      emoji: '🐇',
      status: 'ATRASADO',
      daysText: '8 dias em atraso',
      deadlineText: '03/06/2026',
      sidebarColor: '#eb5757',
      badgeBg: '#bca6f7',
    },
    {
      id: 4,
      title: 'Grande Sertão: Veredas',
      author: 'João Guimarães Rosa',
      borrower: 'Marcos Souza',
      emoji: '🌵',
      status: 'ATIVO',
      daysText: '12 dias restantes',
      deadlineText: '10/07/2026',
      sidebarColor: '#2f80ed',
      badgeBg: '#7dd3fc',
    },
    {
      id: 5,
      title: 'O Hobbit',
      author: 'J.R.R. Tolkien',
      borrower: 'Lucas Lima',
      emoji: '💍',
      status: 'DEVOLVIDO',
      daysText: 'Devolvido no prazo',
      deadlineText: '20/05/2026',
      sidebarColor: '#27ae60',
      badgeBg: '#a7f3d0',
    }
  ];

  // Filtra os itens com base na aba selecionada
  const emprestimosFiltrados = dadosEmprestimos.filter(item => item.status === filtroAtivo);
  
  // Conta o total de atrasados para exibir no topo dinamicamente
  const totalAtrasados = dadosEmprestimos.filter(item => item.status === 'ATRASADO').length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />

      {/* Header Superior */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Empréstimos</Text>
        
        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>{dadosEmprestimos.length}</Text>
        </View>
      </View>

      {/* Barra Horizontal de Filtros (Pills) */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterPill, filtroAtivo === 'ATRASADO' && styles.pillActiveAtrasado]}
          onPress={() => setFiltroAtivo('ATRASADO')}
        >
          <View style={[styles.dot, { backgroundColor: '#eb5757' }]} />
          <Text style={[styles.pillText, filtroAtivo === 'ATRASADO' && styles.pillTextActiveAtrasado]}>Atrasados</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.filterPill, filtroAtivo === 'ATIVO' && styles.pillActiveAtivo]}
          onPress={() => setFiltroAtivo('ATIVO')}
        >
          <View style={[styles.dot, { backgroundColor: '#2f80ed' }]} />
          <Text style={[styles.pillText, filtroAtivo === 'ATIVO' && styles.pillTextActiveAtivo]}>Ativos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.filterPill, filtroAtivo === 'DEVOLVIDO' && styles.pillActiveDevolvido]}
          onPress={() => setFiltroAtivo('DEVOLVIDO')}
        >
          <View style={[styles.dot, { backgroundColor: '#27ae60' }]} />
          <Text style={[styles.pillText, filtroAtivo === 'DEVOLVIDO' && styles.pillTextActiveDevolvido]}>Devolvidos</Text>
        </TouchableOpacity>
      </View>

      {/* Alerta de Resumo de Pendências */}
      {filtroAtivo === 'ATRASADO' && (
        <View style={styles.alertBanner}>
          <View style={[styles.dot, { backgroundColor: '#eb5757', marginRight: 8 }]} />
          <Text style={styles.alertBannerText}>{totalAtrasados} empréstimos atrasados</Text>
        </View>
      )}

      {/* Listagem de Cards */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {emprestimosFiltrados.map((item) => (
          <LoanCard 
            key={item.id}
            title={item.title}
            author={item.author}
            borrower={item.borrower}
            emoji={item.emoji}
            daysText={item.daysText}
            deadlineText={item.deadlineText}
            sidebarColor={item.sidebarColor}
            badgeBg={item.badgeBg}
            onPress={() => navigation.navigate("LoanDetail", { loanId: item.id })}
          />
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  backArrow: {
    fontSize: 20,
    color: '#00213d',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#00213d',
  },
  counterBadge: {
    backgroundColor: '#e8e5f7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  counterText: {
    color: '#8a5cf6',
    fontWeight: '700',
    fontSize: 13,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f0f5',
    marginHorizontal: 24,
    padding: 6,
    borderRadius: 16,
    marginTop: 25,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 6,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b6e71',
  },
  /* Estilos Ativos por Tipo */
  pillActiveAtrasado: { backgroundColor: '#ffebeb' },
  pillTextActiveAtrasado: { color: '#eb5757', fontWeight: '700' },
  
  pillActiveAtivo: { backgroundColor: '#e6f0fa' },
  pillTextActiveAtivo: { color: '#2f80ed', fontWeight: '700' },

  pillActiveDevolvido: { backgroundColor: '#e6f4ea' },
  pillTextActiveDevolvido: { color: '#27ae60', fontWeight: '700' },

  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebeb',
    marginHorizontal: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 4,
  },
  alertBannerText: {
    color: '#eb5757',
    fontWeight: '700',
    fontSize: 13,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 16,
  }
});