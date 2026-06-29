import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ProfileAvatar({ isLogged, initials, onPress }) {
  return (
    
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {isLogged ? ( 
        <Text style={styles.text}>{initials}</Text> 
      ) : (
        <Text style={styles.text}>👽</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8a5cf6', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
