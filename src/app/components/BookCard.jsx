import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function BookCard({ title, author, emoji, isAvailable, bgColor, onPress }) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      
      {/* Parte de Cima: O quadrado colorido com o Emoji e a Tag de Status */}
      <View style={[styles.coverContainer, { backgroundColor: bgColor || '#ffcc00' }]}>
        
        {/* Tag de Status Dinâmica */}
        <View style={[
          styles.statusTag, 
          isAvailable ? styles.tagAvailable : styles.tagUnavailable
        ]}>
          <Text style={[
            styles.statusText, 
            isAvailable ? styles.textAvailable : styles.textUnavailable
          ]}>
            {isAvailable ? 'Disponível' : 'Indisponível'}
          </Text>
        </View>

        {/* Emoji Centralizado representativo do Livro */}
        <Text style={styles.emojiText}>{emoji || '📖'}</Text>
      </View>

      {/* Parte de Baixo: Textos Informativos */}
      <View style={styles.infoContainer}>
        <Text style={styles.titleText} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.authorText} numberOfLines={1}>
          {author}
        </Text>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '47%',               // Ocupa quase metade da largura para caberem dois por linha
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 15,
    overflow: 'hidden',         // Garante que o fundo colorido respeite o arredondamento do card
    
    // Efeito de sombra leve igual ao do seu design
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  coverContainer: {
    height: 150,                // Altura da área colorida do emoji
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',       // Permite posicionar a tag de status de forma absoluta lá no topo
  },
  statusTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagAvailable: {
    backgroundColor: 'rgba(212, 247, 226, 0.85)', // Verde bem suave e com leve transparência
  },
  tagUnavailable: {
    backgroundColor: 'rgba(255, 220, 220, 0.85)', // Vermelhinho suave para o indisponível
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  textAvailable: {
    color: '#27ae60',
  },
  textUnavailable: {
    color: '#eb5757',
  },
  emojiText: {
    fontSize: 50,               // Deixa o emoji grandão no centro do card
  },
  infoContainer: {
    padding: 12,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00213d',           // O tom de azul escuro do seu layout
    marginBottom: 4,
    lineHeight: 18,
  },
  authorText: {
    fontSize: 12,
    color: '#8a5cf6',           // O roxo da sua identidade visual para destacar o autor
    fontWeight: '500',
  },
});