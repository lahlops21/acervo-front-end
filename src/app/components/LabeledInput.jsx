import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function LabeledInput({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label?.toUpperCase()}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#a0a5aa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6b6e71',
    letterSpacing: 1,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e8e8e8',
    height: 52,
    borderRadius: 16, // Cantos bem arredondados como no protótipo
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#00213d',
  },
});