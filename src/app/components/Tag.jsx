import { View, Text, StyleSheet } from 'react-native';

export default function Tag({ text, bgColor, textColor }) {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.text, { color: textColor }]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginRight: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});