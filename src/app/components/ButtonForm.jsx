import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ButtonForm({ textButton, onPress, variant = 'primary' }) {
  // Define o estilo dinamicamente baseado na variante ("primary" ou "secondary")
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity 
      style={[styles.button, isPrimary ? styles.buttonPrimary : styles.buttonSecondary]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.title, isPrimary ? styles.textPrimary : styles.textSecondary]}>
        {textButton || "Não Informado"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 20, // Bordas super arredondadas e modernas como na imagem
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40, // Centraliza deixando espaço nas laterais
    width: '80%',
    alignSelf: 'center',
    marginBottom: 14
  },
  buttonPrimary: {
    backgroundColor: "#8a5cf6", // O roxo oficial da sua HomeScreen e do protótipo
    // Sombra leve para dar profundidade ao botão principal
    shadowColor: "#8a5cf6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#8a5cf6",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  textPrimary: {
    color: "#FFFFFF",
  },
  textSecondary: {
    color: "#8a5cf6",
  }
});