import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LoanCard({ title, author, borrower, emoji, daysText, deadlineText, sidebarColor, badgeBg, badgeTextColor, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Indicador de cor lateral esquerdo */}
      <View style={[styles.sidebar, { backgroundColor: sidebarColor || '#eb5757' }]} />
      
      {/* Lado Esquerdo: Capa com Emoji */}
      <View style={[styles.coverContainer, { backgroundColor: badgeBg || '#fcd34d' }]}>
        <Text style={styles.emojiText}>{emoji || '📖'}</Text>
      </View>

      {/* Centro: Informações do Empréstimo */}
      <View style={styles.content}>
        <Text style={styles.bookTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.authorText} numberOfLines={1}>{author}</Text>
        <Text style={styles.borrowerText} numberOfLines={1}>{borrower}</Text>
        
        {/* Tag de tempo restante/atraso */}
        <View style={[styles.timeTag, { backgroundColor: sidebarColor ? `${sidebarColor}15` : '#ffebeb' }]}>
          <Text style={[styles.timeTagText, { color: sidebarColor || '#eb5757' }]}>{daysText}</Text>
        </View>

        {/* Informação de Prazo */}
        <Text style={styles.deadlineText}>Prazo: <Text style={styles.deadlineDate}>{deadlineText}</Text></Text>
      </View>

      {/* Indicador de clique/Seta para o lado */}
      <View style={styles.arrowContainer}>
        <Text style={styles.arrowIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e8e8e8'
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
  },
  coverContainer: {
    width: 75,
    height: 90,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginLeft: 6,
  },
  emojiText: {
    fontSize: 32,
  },
  content: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00213d',
    marginBottom: 2,
  },
  authorText: {
    fontSize: 12,
    color: '#8a5cf6',
    fontWeight: '600',
    marginBottom: 1,
  },
  borrowerText: {
    fontSize: 13,
    color: '#6b6e71',
    fontWeight: '500',
    marginBottom: 6,
  },
  timeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
  },
  timeTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  deadlineText: {
    fontSize: 11,
    color: '#a0a5aa',
    fontWeight: '500',
  },
  deadlineDate: {
    color: '#eb5757',
    fontWeight: '600',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
  },
  arrowIcon: {
    fontSize: 22,
    color: '#bca6f7',
    fontWeight: '600',
  }
});