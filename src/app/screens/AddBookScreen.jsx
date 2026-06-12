// screens/AddBookScreen.jsx
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  SafeAreaView, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import Tag from '../components/Tag'; // Reutilizando o componente!
import { maskISBN} from '../utils/masks';

export default function AddBookScreen() {
  const navigation = useNavigation();

  // Estados dos formulários
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [year, setYear] = useState('');
  const [copies, setCopies] = useState(1);
  const [synopsis, setSynopsis] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  
  // Estado das Categorias Selecionadas
  const [selectedCategories, setSelectedCategories] = useState(['Fantasia', 'Clássico']); // Iniciando com as do seu mock

  // Lista global de categorias do seu sistema
  const todasCategorias = ['Fantasia', 'Clássico', 'Romance', 'Ficção', 'Aventura', 'Infantil', 'Biografia', 'Drama'];

  const handleSelectCategory = (categoria) => {
    if (!selectedCategories.includes(categoria)) {
      setSelectedCategories([...selectedCategories, categoria]);
    }
  };

  const handleRemoveCategory = (categoria) => {
    setSelectedCategories(selectedCategories.filter(cat => cat !== categoria));
  };

  const handleSave = () => {
    // Simulação do disparo de sucesso/erro ao conectar com o banco em Java
    if (!title || !author || !isbn) {
      Alert.alert("Erro ao cadastrar", "Por favor, preencha todos os campos obrigatórios (*)");
      return;
    }

    Alert.alert(
      "Sucesso!", 
      "O livro foi cadastrado com sucesso no banco de dados do Acervo.me!",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER DA TELA */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastrar Livro</Text>
        <View style={{ width: 40 }} /> {/* Espaçador para centralizar o título */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ÁREA DE UPLOAD RETANGULAR (Formato de Capa de Livro) */}
        <TouchableOpacity style={styles.coverUploadZone}>
          <Ionicons name="camera" size={32} color="#475569" />
          <Text style={styles.uploadTitle}>Adicionar capa do livro</Text>
          <Text style={styles.uploadSubtitle}>Apenas JPG ou JPEG • toque para selecionar</Text>
        </TouchableOpacity>

        {/* INPUTS UTILIZANDO O SEU COMPONENTE */}
        <CustomInput 
          label="Título do Livro *" 
          placeholder="Ex: Alice no País das Maravilhas"
          value={title}
          onChangeText={setTitle}
        />

        <CustomInput 
          label="Autor(es) *" 
          placeholder="Ex: Lewis Carroll"
          value={author}
          onChangeText={setAuthor}
        />

        <CustomInput 
          label="ISBN *" 
          placeholder="978-65-534-0075-2"
          keyboardType="numeric" 
          maxLength={17} // 13 números + 4 traços = 17 caracteres no máximo
          value={isbn}
          onChangeText={(text) => setIsbn(maskISBN(text))} // máscara!!
/>

        {/* SEÇÃO DO DROPDOWN DE CATEGORIAS MOCKADO */}
<View style={styles.categorySection}>
  <Text style={styles.sectionLabel}>CATEGORIAS * <Text style={styles.minText}>(min. 2)</Text></Text>
  
  {/* Caixa do Dropdown - Agora ela é clicável e muda o estado 'menuAberto' */}
  <TouchableOpacity 
    style={styles.dropdownFake} 
    onPress={() => setMenuAberto(!menuAberto)}
  >
    <Text style={{ color: '#94A3B8', fontWeight: '500' }}>
      {menuAberto ? "Feche as opções..." : "Selecione as categorias..."}
    </Text>
    <Ionicons 
      name={menuAberto ? "chevron-up" : "chevron-down"} 
      size={20} 
      color="#7E22CE" 
    />
  </TouchableOpacity>

  {/* LISTA DE OPÇÕES MOCKADAS DO DROPDOWN (Só aparece se menuAberto for true) */}
  {menuAberto && (
    <View style={styles.dropdownMenu}>
      {todasCategorias
        // Filtra para não mostrar no menu as categorias que já foram selecionadas e viraram Tag
        .filter(categoria => !selectedCategories.includes(categoria))
        .map((categoria, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.dropdownOption}
            onPress={() => {
              handleSelectCategory(categoria);
              setMenuAberto(false); // Fecha o menu após selecionar
            }}
          >
            <Text style={styles.dropdownOptionText}>{categoria}</Text>
            <Ionicons name="add-circle-outline" size={18} color="#8B5CF6" />
          </TouchableOpacity>
        ))}
    </View>
  )}

  {/* AS TAGS SELECIONADAS APARECENDO LOGO ABAIXO DO CAMPO */}
  <View style={styles.tagsContainer}>
    {selectedCategories.map((cat, index) => (
      <TouchableOpacity key={index} onPress={() => handleRemoveCategory(cat)}>
        <Tag 
          text={`${cat}  ✕`} 
          bgColor="#7E22CE" 
          textColor="#FFFFFF" 
        />
      </TouchableOpacity>
    ))}
  </View>
</View>

        <CustomInput 
          label="Ano de Publicação *" 
          placeholder="Ex: 1865"
          keyboardType="numeric"
          maxLength={4} // Trava estritamente em 4 dígitos (AAAA)
          value={year}
          // Esse replace(/\D/g, "") garante que se ele tentar digitar uma letra, ela é apagada na hora
          onChangeText={(text) => setYear(text.replace(/\D/g, ""))} 
/>

        {/* CONTADOR DE EXEMPLARES */}
        <View style={styles.counterSection}>
          <Text style={styles.sectionLabel}>QUANTIDADE DE EXEMPLARES *</Text>
          <View style={styles.counterRow}>
            <TouchableOpacity 
              style={styles.counterBtn} 
              onPress={() => copies > 1 && setCopies(copies - 1)}
            >
              <Text style={styles.counterBtnText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.counterValue}>{copies}</Text>
            
            <TouchableOpacity 
              style={styles.counterBtn} 
              onPress={() => setCopies(copies + 1)}
            >
              <Text style={styles.counterBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CAMPO DE SINOPSE MULTILINE */}
        <CustomInput 
          label="Sinopse" 
          placeholder="Digite o resumo da obra..."
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: 'top' }} // Garante o texto no topo esquerdo
          value={synopsis}
          onChangeText={setSynopsis}
        />

        {/* BOTÕES DE AÇÃO (SALVAR / CANCELAR) */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Livro</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E1B4B' },
  scrollContent: { padding: 24, paddingBottom: 40 },
  
  // Customização da Capa Retangular solicitada por você
  coverUploadZone: {
    width: '60%', // Deixando centralizado e menor que as laterais
    aspectRatio: 3 / 4, // Proporção perfeita de capa de livro retangular
    alignSelf: 'center',
    backgroundColor: '#F3E8FF',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#C084FC',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 24,
  },
  uploadTitle: { fontSize: 15, fontWeight: '700', color: '#7E22CE', marginTop: 12, textAlign: 'center' },
  uploadSubtitle: { fontSize: 11, color: '#94A3B8', marginTop: 4, textAlign: 'center' },

  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    marginTop: 4,
    maxHeight: 200, // Limita o tamanho e ativa a rolagem interna se tiver muitas categorias
    overflow: 'hidden',
    // Sombra para dar o efeito de que o menu está "sobre" a tela
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  dropdownOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  dropdownOptionText: {
    fontSize: 15,
    color: '#334155',
  },
  
  sectionLabel: { fontSize: 12, fontWeight: '700', color: '#475569', marginBottom: 8 },
  minText: { fontSize: 11, color: '#7E22CE', fontWeight: 'normal' },
  dropdownFake: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12, marginBottom: 16 },
  counterSection: { marginBottom: 20 },
  counterRow: { flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 4 },
  counterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
  },
  counterBtnText: { fontSize: 20, color: '#7E22CE', fontWeight: '600' },
  counterValue: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, gap: 16 },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  cancelButtonText: { fontSize: 16, fontWeight: '700', color: '#64748B' },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    boxShadow: '0px 4px 10px rgba(139, 92, 246, 0.3)', // Efeito de elevação roxa do botão salvar
  },
  saveButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});