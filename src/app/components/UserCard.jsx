// components/UserCard.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserCard({ name, code, isApt }) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.userCode}>ID DO USUÁRIO: {code}</Text>
        <Text style={styles.userName}>{name}</Text>
      </View>
      
      {/* O indicador de status (Apto ou Não) */}
      <View style={styles.statusContainer}>
        <View style={[styles.statusDot, { backgroundColor: isApt ? '#10B981' : '#EF4444' }]} />
        <Text style={[styles.statusText, { color: isApt ? '#10B981' : '#EF4444' }]}>
          {isApt ? 'Apto' : 'Pendente'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginTop: 10,
  },
  content: { flex: 1 },
  userCode: { fontSize: 11, fontWeight: '700', color: '#94A3B8', marginBottom: 4 },
  userName: { fontSize: 18, fontWeight: '700', color: '#1E1B4B' },
  statusContainer: { alignItems: 'center', gap: 4 },
  statusDot: { width: 12, height: 12, borderRadius: 6 },
  statusText: { fontSize: 12, fontWeight: '700' },
});