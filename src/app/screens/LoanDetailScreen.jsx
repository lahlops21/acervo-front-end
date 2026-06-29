import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoanDetailScreen({ route, navigation }) {
  // Pegamos o ID passado por parâmetro (ou usamos o mock padrão do protótipo)
  const { loanId } = route.params || { loanId: 1 };

  // Simulando o estado do empréstimo para poder alterá-lo dinamicamente
  const [loanStatus, setLoanStatus] = useState('ATIVO'); // 'ATIVO' ou 'DEVOLVIDO'

  const handleReturnBook = () => {
    Alert.alert(
      "Confirmar Devolução",
      "Deseja registrar a devolução deste exemplar? O estoque do livro subirá +1 e o leitor será liberado.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: () => {
            setLoanStatus('DEVOLVIDO');
            Alert.alert(
              "Sucesso!", 
              "Devolução registrada!\n• Estoque atualizado (+1)\n• Status do leitor: Disponível.",
              [{ text: "OK", onPress: () => navigation.goBack() }]
            );
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />

      {/* Header Fixo */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhe</Text>
        <View style={{ width: 44 }} /> {/* Espaçador para centralizar o título */}
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Badge de Status Dinâmico */}
        <View style={[
          styles.statusBadge, 
          loanStatus === 'DEVOLVIDO' ? styles.badgeDevolvido : styles.badgeAtivo
        ]}>
          <View style={[
            styles.dot, 
            { backgroundColor: loanStatus === 'DEVOLVIDO' ? '#27ae60' : '#2f80ed' }
          ]} />
          <Text style={[
            styles.statusBadgeText, 
            { color: loanStatus === 'DEVOLVIDO' ? '#27ae60' : '#2f80ed' }
          ]}>
            Empréstimo {loanStatus === 'DEVOLVIDO' ? 'Devolvido' : 'Ativo'}
          </Text>
        </View>

        {/* Card de Capa / Livro Prominente */}
        <View style={[styles.bookBannerCard, { backgroundColor: '#fcd34d' }]}>
          <Text style={styles.bannerEmoji}>🐱</Text>
          <View style={styles.bannerTextOverlay}>
            <Text style={styles.bannerTitle}>Alice no País das Maravilhas</Text>
            <Text style={styles.bannerAuthor}>Lewis Carroll</Text>
          </View>
        </View>

        {/* Section: Progresso do Prazo */}
        {loanStatus === 'ATIVO' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardSectionTitle}>PROGRESSO DO PRAZO</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '45%' }]} />
            </View>
            <View style={styles.datesMetaRow}>
              <View>
                <Text style={styles.dateMetaLabel}>Empréstimo</Text>
                <Text style={styles.dateMetaValue}>11/06/2025</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.dateMetaLabel}>Devolução prevista</Text>
                <Text style={styles.dateMetaValue}>18/06/2025</Text>
              </View>
            </View>
            <Text style={styles.daysRemainingText}>• 4 dias restantes</Text>
          </View>
        )}

        {/* Section: Informações Completas do Empréstimo */}
        <View style={styles.infoCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardSectionTitle}>INFORMAÇÕES DO EMPRÉSTIMO</Text>
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarText}>JS</Text>
            </View>
          </View>

          {/* Linha: Leitor */}
          <View style={styles.dataRow}>
            <Text style={styles.rowIcon}>👤</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowLabel}>LEITOR</Text>
              <Text style={styles.rowValue}>João da Silva</Text>
            </View>
          </View>

          {/* Linha: E-mail */}
          <View style={styles.dataRow}>
            <Text style={styles.rowIcon}>✉️</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowLabel}>E-MAIL</Text>
              <Text style={styles.rowValue}>joao@email.com</Text>
            </View>
          </View>

          {/* Linha: Telefone */}
          <View style={styles.dataRow}>
            <Text style={styles.rowIcon}>📱</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowLabel}>TELEFONE</Text>
              <Text style={styles.rowValue}>(11) 99234-5678</Text>
            </View>
          </View>

          {/* Linha: Endereço */}
          <View style={styles.dataRow}>
            <Text style={styles.rowIcon}>📍</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowLabel}>ENDEREÇO</Text>
              <Text style={styles.rowValue}>Rua das Flores, 456, Bairro B, Cidade Alegre</Text>
            </View>
          </View>

          {/* Linha: Nome do Livro */}
          <View style={styles.dataRow}>
            <Text style={styles.rowIcon}>📖</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowLabel}>LIVRO</Text>
              <Text style={styles.rowValue}>Alice no País das Maravilhas</Text>
            </View>
          </View>

          {/* Grid de Datas Inferior */}
          <View style={styles.gridDatesContainer}>
            <View style={styles.gridDateBox}>
              <Text style={styles.gridDateLabel}>DATA DE EMPRÉSTIMO</Text>
              <View style={styles.pillDateBgBlue}>
                <Text style={styles.pillDateTextBlue}>📅 11/06/2025</Text>
              </View>
            </View>

            <View style={styles.gridDateBox}>
              <Text style={styles.gridDateLabel}>DATA DE DEVOLUÇÃO</Text>
              <View style={styles.pillDateBgPurple}>
                <Text style={styles.pillDateTextPurple}>📆 18/06/2025</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bloco de Botões de Ação na base */}
        {loanStatus === 'ATIVO' && (
          <TouchableOpacity style={styles.primaryActionButton} onPress={handleReturnBook}>
            <Text style={styles.primaryActionText}>Registrar Devolução</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.secondaryActionButton} onPress={() => Alert.alert("Contato", "Abrindo WhatsApp...")}>
          <Text style={styles.secondaryActionText}>📞 Contatar Leitor</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
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
    paddingBottom: 8,
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginLeft: 24,
    marginTop: 16,
    marginBottom: 16,
  },
  badgeAtivo: { backgroundColor: '#e6f0fa' },
  badgeDevolvido: { backgroundColor: '#e6f4ea' },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  bookBannerCard: {
    marginHorizontal: 24,
    height: 200,
    borderRadius: 28,
    padding: 24,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  bannerEmoji: {
    fontSize: 54,
  },
  bannerTextOverlay: {
    marginTop: 'auto',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  bannerAuthor: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
    marginTop: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginHorizontal: 24,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#a0a5aa',
    letterSpacing: 1,
  },
  avatarBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#8a5cf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#eee8ff',
    borderRadius: 3,
    marginTop: 12,
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#8a5cf6',
    borderRadius: 3,
  },
  datesMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateMetaLabel: {
    fontSize: 11,
    color: '#a0a5aa',
    fontWeight: '500',
  },
  dateMetaValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00213d',
    marginTop: 2,
  },
  daysRemainingText: {
    fontSize: 13,
    color: '#2f80ed',
    fontWeight: '700',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  rowIcon: {
    fontSize: 18,
    marginRight: 14,
    color: '#6b6e71',
  },
  rowRight: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 10,
    color: '#a0a5aa',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  rowValue: {
    fontSize: 14,
    color: '#00213d',
    fontWeight: '600',
    marginTop: 2,
  },
  gridDatesContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  gridDateBox: {
    flex: 1,
  },
  gridDateLabel: {
    fontSize: 10,
    color: '#a0a5aa',
    fontWeight: '700',
    marginBottom: 6,
  },
  pillDateBgBlue: {
    backgroundColor: '#e6f0fa',
    paddingvertical: 8,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  pillDateTextBlue: {
    color: '#2f80ed',
    fontSize: 12,
    fontWeight: '700',
  },
  pillDateBgPurple: {
    backgroundColor: '#eee8ff',
    paddingVertical: 8,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  pillDateTextPurple: {
    color: '#8a5cf6',
    fontSize: 12,
    fontWeight: '700',
  },
  primaryActionButton: {
    backgroundColor: '#8a5cf6',
    marginHorizontal: 24,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#8a5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  primaryActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryActionButton: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: '#e8e8e8',
  },
  secondaryActionText: {
    color: '#8a5cf6',
    fontSize: 15,
    fontWeight: '700',
  },
});