// components/LoanCard.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Tag from './Tag'; // Reutilizando sua Tag!

export default function LoanCard({ name, bookTitle, status, statusColor, badgeBg, badgeText }) {
  return (
    <View style={styles.card}>
      {/* Indicador de cor lateral esquerdo */}
      <View style={[styles.sidebar, { backgroundColor: statusColor }]} />
      
      <View style={styles.avatarPlaceholder}>
        {/* Aqui futuramente pode ser um emoji ou iniciais */}
        <Text style={styles.avatarText}>{name.charAt(0)}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bookTitle}>{bookTitle}</Text>
      </View>

      <Tag text={status} bgColor={badgeBg} textColor={badgeText} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  avatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginLeft: 5,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7E22CE',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00213d',
    marginBottom: 2,
  },
  bookTitle: {
    fontSize: 13,
    color: '#64748b',
  },
});