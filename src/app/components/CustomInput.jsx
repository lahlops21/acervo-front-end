// components/CustomInput.jsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function CustomInput({ label, style, ...rest }) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label.toUpperCase()}</Text>}
      <TextInput 
        style={styles.input} 
        placeholderTextColor="#94A3B8"
        {...rest} // Repassa chaves como keyboardType, onChangeText, etc.
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1E293B',
  },
});