import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import Tag from '../components/Tag'; 

export default function BookDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // Se route.params.bookData não vier, usamos um objeto padrão mapeado em português para não quebrar
  const bookData = route.params?.bookData || {
    idLivro: null,
    isbn: "978-0-00-000000",
    titulo: "Livro Sem Título",
    nomesAutores: ["Autor Desconhecido"],
    editora: "Editora Desconhecida",
    anoPublicacao: "----",
    sinopse: "Sem sinopse disponível.",
    quantidadeExemplares: 0,
    statusDisponibilidade: "INDISPONIVEL",
    urlCapa: null,
    categorias: [] 
  };

  // Tratamos o status que vem do Enum Java como String
  const isAvailable = bookData.statusDisponibilidade === "DISPONIVEL";

  // Juntamos a lista de autores em uma única string amigável
  const autoresTexto = bookData.nomesAutores && bookData.nomesAutores.length > 0 
    ? bookData.nomesAutores.join(', ') 
    : "Autor Desconhecido";

  // Tratamos a imagem da capa (convertendo byte[] para base64 ou usando URL mock se o array estiver vazio)
  const coverSource = bookData.urlCapa 
    ? { uri: `data:image/jpeg;base64,${bookData.urlCapa}` }
    : { uri: "https://images-na.ssl-images-amazon.com/images/I/8166Inp9JYL.jpg" }; // Fallback padrão

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER COM CAPA E BOTÃO VOLTAR */}
        {/* Trocamos bookData.color por uma cor fixa charmosa (#7E22CE), já que o banco não salva cores */}
        <View style={[styles.header, { backgroundColor: '#7E22CE' }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Image source={coverSource} style={styles.coverImage} />
        </View>

        {/* CONTEÚDO */}
        <View style={styles.content}>
          <Text style={styles.title}>{bookData.titulo}</Text>
          
          {/* TAGS DO LIVRO */}
          <View style={styles.tagRow}>
            {/* Tag principal exibindo a string tratada de Autores */}
            <Tag text={autoresTexto} bgColor="#F3E8FF" textColor="#7E22CE" />
            
            {/* Varre a lista de categorias do banco enviada pelo Java */}
            {bookData.categorias && bookData.categorias.length > 0 ? (
              bookData.categorias.map((cat, index) => (
                <Tag 
                  key={index} 
                  text={cat} 
                  bgColor="#E0F2FE" 
                  textColor="#0369A1" 
                />
              ))
            ) : (
              // Fallback caso o livro em questão não possua categorias salvas no H2
              <Tag text="Geral" bgColor="#E0F2FE" textColor="#0369A1" />
            )}
          </View>

          {/* STATUS DISPONIBILIDADE */}
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: isAvailable ? '#22c55e' : '#ef4444' }]} />
            <Text style={[styles.statusText, { color: isAvailable ? '#22c55e' : '#ef4444' }]}>
              {isAvailable ? 'Disponível' : 'Indisponível'}
            </Text>
            <View style={styles.stars}>
               <Ionicons name="star" size={16} color="#fcd34d" />
               <Ionicons name="star" size={16} color="#fcd34d" />
               <Ionicons name="star" size={16} color="#fcd34d" />
               <Ionicons name="star" size={16} color="#fcd34d" />
               <Ionicons name="star" size={16} color="#fcd34d" />
            </View>
          </View>

          {/* GRID DE INFORMAÇÕES TÉCNICAS (Traduzido para bater com o Java) */}
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>PUBLICAÇÃO</Text>
              <Text style={styles.infoValue}>{bookData.anoPublicacao}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>EDITORA</Text>
              <Text style={styles.infoValue}>{bookData.editora}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>EXEMPLARES</Text>
              <Text style={styles.infoValue}>
                {bookData.quantidadeExemplares ?? 0} {bookData.quantidadeExemplares === 1 ? 'livro' : 'livros'}
              </Text>
            </View>
          </View>

          {/* SINOPSE */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SINOPSE</Text>
            <Text style={styles.synopsisText}>{bookData.sinopse}</Text>
          </View>

          {/* BOX DO ISBN */}
          <View style={styles.isbnContainer}>
             <View style={styles.isbnIconBox}>
                <Ionicons name="pricetag" size={24} color="#7E22CE" />
             </View>
             <View style={styles.isbnContent}>
                <Text style={styles.isbnLabel}>CÓDIGO DO LIVRO (ISBN)</Text>
                <Text style={styles.isbnValue}>{bookData.isbn}</Text>
                <Text style={styles.isbnHint}>Informe este código ao bibliotecário para realizar o empréstimo</Text>
             </View>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 320, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  backButton: { position: 'absolute', top: 50, left: 20, backgroundColor: '#fff', padding: 8, borderRadius: 10, zIndex: 10 },
  coverImage: { width: 180, height: 260, borderRadius: 15, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 10 },
  content: { padding: 25 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#00213d', marginBottom: 15 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, gap: 5 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  statusText: { fontWeight: 'bold', fontSize: 16, marginRight: 'auto' },
  stars: { flexDirection: 'row', gap: 2 },
  infoGrid: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#f1f5f9', paddingVertical: 20, marginBottom: 25 },
  infoItem: { flex: 1 },
  infoLabel: { fontSize: 10, color: '#94a3b8', fontWeight: 'bold', marginBottom: 5 },
  infoValue: { fontSize: 14, color: '#00213d', fontWeight: 'bold' },
  sectionTitle: { fontSize: 14, color: '#94a3b8', fontWeight: 'bold', marginBottom: 15 },
  synopsisText: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 30 },
  isbnContainer: { backgroundColor: '#F3E8FF', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 40, borderWidth: 1, borderColor: '#E9D5FF' },
  isbnIconBox: { backgroundColor: '#fff', padding: 12, borderRadius: 15, marginRight: 15 },
  isbnContent: { flex: 1 },
  isbnLabel: { fontSize: 10, color: '#7E22CE', fontWeight: 'bold', marginBottom: 2 },
  isbnValue: { fontSize: 20, color: '#7E22CE', fontWeight: 'bold', letterSpacing: 1 },
  isbnHint: { fontSize: 10, color: '#A855F7', marginTop: 4 }
});
