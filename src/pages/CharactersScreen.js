import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator, TextInput, Keyboard } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CharactersScreen = ({ navigation }) => {
    const [characters, setCharacters] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    // Carrega e salva personagens
    useEffect(() => {
        const loadData = async () => {
            const saved = await AsyncStorage.getItem("characters");
            if (saved) setCharacters(JSON.parse(saved));
        };
        loadData();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("characters", JSON.stringify(characters));
    }, [characters]);

    // Busca personagens na API
    const fetchCharacter = async () => {
        if (!searchText.trim() || loading) return;

        setLoading(true);
        try {
            const { data } = await api.get(`/people/?search=${searchText}`);
            if (data.results.length === 0) return alert("Personagem não encontrado!");

            const newChar = data.results[0];
            if (characters.some(c => c.name === newChar.name)) {
                return alert("Personagem já adicionado!");
            }

            setCharacters([...characters, newChar]);
            setSearchText("");
            Keyboard.dismiss();
        } catch (error) {
            alert("Erro ao buscar personagem");
        } finally {
            setLoading(false);
        }
    };

    // Filtra personagens
    const filteredChars = searchText
        ? characters.filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()))
        : characters;

    // Componente de fundo estrelado
    const StarBackground = ({ children }) => (
        <View style={styles.starContainer}>
            {[...Array(100)].map((_, i) => (
                <View key={i} style={{
                    position: "absolute",
                    backgroundColor: "#FFF",
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    borderRadius: 50,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.7 + 0.3,
                }} />
            ))}
            <View style={styles.content}>{children}</View>
        </View>
    );

    return (
        <StarBackground>
            <View style={styles.container}>
                {/* Barra de pesquisa */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#FFE81F" style={styles.icon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar personagem..."
                        placeholderTextColor="#888"
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmitEditing={fetchCharacter}
                        returnKeyType="search"
                    />
                    {searchText ? (
                        <TouchableOpacity onPress={() => setSearchText("")}>
                            <Ionicons name="close-circle" size={20} color="#FFE81F" style={styles.icon} />
                        </TouchableOpacity>
                    ) : null}
                    <TouchableOpacity onPress={fetchCharacter} disabled={loading}>
                        {loading ? <ActivityIndicator color="#FFE81F" /> : <MaterialIcons name="add" size={24} color="#FFE81F" />}
                    </TouchableOpacity>
                </View>

                {/* Lista de personagens */}
                <FlatList
                    data={filteredChars}
                    keyExtractor={(_, i) => i.toString()}
                    ListEmptyComponent={<Text style={styles.emptyText}>Nenhum personagem adicionado</Text>}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.info}>Gênero: {item.gender}</Text>
                            <Text style={styles.info}>Nascimento: {item.birth_year}</Text>

                            <View style={styles.buttons}>
                                <TouchableOpacity style={[styles.button, styles.remove]} onPress={() => setCharacters(chars => chars.filter(c => c.name !== item.name))}>
                                    <Text style={styles.buttonText}>EXCLUIR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.details]} onPress={() => navigation.navigate("CharacterDetail", { character: item })}>
                                    <Text style={[styles.buttonText, styles.detailsText]}>VER MAIS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </StarBackground>
    );
};

// Estilos otimizados
const styles = StyleSheet.create({
    starContainer: { flex: 1, backgroundColor: "#000" },
    content: { flex: 1, zIndex: 1 },
    container: { flex: 1, padding: 15 },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        borderRadius: 25,
        padding: 15,
        marginBottom: 15,
    },
    icon: { marginRight: 10 },
    searchInput: {
        flex: 1,
        color: "#FFE81F",
        fontSize: 16,
    },
    card: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 20,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FFE81F",
    },
    name: {
        color: "#FFE81F",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    info: { color: "#FFF", marginBottom: 5 },
    buttons: { flexDirection: 'row', marginTop: 10 },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    remove: { backgroundColor: "rgba(255, 0, 0, 0.7)" },
    details: { backgroundColor: "#FFE81F", flex: 2 },
    buttonText: { fontWeight: "bold" },
    detailsText: { color: "#000" },
    emptyText: { color: "#FFF", textAlign: "center", marginTop: 20 },
});

export default CharactersScreen;