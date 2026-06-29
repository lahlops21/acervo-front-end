import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function ManageBookCard({ title, author, emoji, copiesText, categories, bgColor, onEdit, onDelete }) {
  return (
    <View style={styles.cardContainer}>
      
      {/* Bloco superior com Informações + Capa Emoji */}
      <View style={styles.mainContent}>
        {/* Lado Esquerdo: Textos e Tags */}
        <View style={styles.infoSide}>
          <Text style={styles.titleText} numberOfLines={2}>{title}</Text>
          <Text style={styles.authorText} numberOfLines={1}>{author}</Text>
          
          {/* Fileira de Tags de Categoria */}
          <View style={styles.tagsRow}>
            {categories?.map((cat, index) => (
              <View key={index} style={styles.categoryTag}>
                <Text style={styles.categoryText}>{cat}</Text>
              </View>
            ))}
          </View>

          {/* Tag de Quantidade / Disponibilidade */}
          <View style={[
            styles.statusTag, 
            copiesText?.includes('Indisponível') ? styles.tagUnavailable : styles.tagAvailable
          ]}>
            <Text style={[
              styles.statusText, 
              copiesText?.includes('Indisponível') ? styles.textUnavailable : styles.textAvailable
            ]}>
              {copiesText}
            </Text>
          </View>
        </View>

        {/* Lado Direito: Capa Quadrada Colorida */}
        <View style={[styles.coverContainer, { backgroundColor: bgColor || '#ffcc00' }]}>
          <Text style={styles.emojiText}>{emoji || '📖'}</Text>
        </View>
      </View>

      {/* Linha Divisória interna sutil */}
      <View style={styles.divider} />

      {/* Bloco inferior: Botões de Ação */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit} activeOpacity={0.7}>
          <Text style={styles.editText}>✏️ Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={onDelete} activeOpacity={0.7}>
          <Text style={styles.deleteText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e8e8e8'
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoSide: {
    flex: 1,
    paddingRight: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00213d',
    lineHeight: 20,
    marginBottom: 2,
  },
  authorText: {
    fontSize: 13,
    color: '#a0a5aa',
    fontWeight: '500',
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  categoryTag: {
    backgroundColor: '#eee8ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    color: '#8a5cf6',
    fontWeight: '600',
  },
  statusTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  tagAvailable: {
    backgroundColor: 'rgba(212, 247, 226, 0.85)',
  },
  tagUnavailable: {
    backgroundColor: 'rgba(255, 220, 220, 0.85)',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textAvailable: {
    color: '#27ae60',
  },
  textUnavailable: {
    color: '#eb5757',
  },
  coverContainer: {
    width: 80,
    height: 95,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  emojiText: {
    fontSize: 36,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f1f1',
    marginVertical: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0ebff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    color: '#8a5cf6',
    fontSize: 13,
    fontWeight: '700',
  },
  deleteButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffebeb',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#eb5757',
    fontSize: 13,
    fontWeight: '700',
  },
});