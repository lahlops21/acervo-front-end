// components/QuickAction.jsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Decidimos qual biblioteca de ícone usar com base no nome
export default function QuickAction({ 
  title, 
  subtitle, 
  iconName, 
  iconFamily = 'Ionicons', // Padrão é Ionicons
  iconColor, 
  iconBgColor, 
  onPress 
}) {
  
  const IconComponent = iconFamily === 'Material' ? MaterialCommunityIcons : Ionicons;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}>
        <IconComponent name={iconName} size={24} color={iconColor} />
      </View>
      
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '47%', // Para caberem dois por linha
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    
    // Sombra suave para dar profundidade
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    
    marginBottom: 16,
    justifyContent: 'space-between',
    minHeight: 140, // Garante que todos tenham a mesma altura
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
});