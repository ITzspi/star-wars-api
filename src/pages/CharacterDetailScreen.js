import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import api from "../api";

const CharacterDetailScreen = ({ route }) => {
    const { character } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailCard}>
                <Text style={styles.title}>{character.name}</Text>

                <View style={styles.infoGroup}>
                    <Text style={styles.label}>GÊNERO:</Text>
                    <Text style={styles.info}>{character.gender === "n/a" ? "Não aplicável" : character.gender}</Text>
                </View>

                <View style={styles.infoGroup}>
                    <Text style={styles.label}>ANO DE NASCIMENTO:</Text>
                    <Text style={styles.info}>{character.birth_year}</Text>
                </View>

                <View style={styles.infoGroup}>
                    <Text style={styles.label}>ALTURA:</Text>
                    <Text style={styles.info}>{character.height} cm</Text>
                </View>

                <View style={styles.infoGroup}>
                    <Text style={styles.label}>PESO:</Text>
                    <Text style={styles.info}>{character.mass} kg</Text>
                </View>

                <View style={styles.infoGroup}>
                    <Text style={styles.label}>COR DOS OLHOS:</Text>
                    <Text style={styles.info}>{character.eye_color}</Text>
                </View>

                <View style={styles.infoGroup}>
                    <Text style={styles.label}>COR DA PELE:</Text>
                    <Text style={styles.info}>{character.skin_color}</Text>
                </View>

                <View style={styles.infoGroup}>
                    <Text style={styles.label}>COR DO CABELO:</Text>
                    <Text style={styles.info}>{character.hair_color}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "transparent",
    },
    detailCard: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 25,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FFE81F",
        shadowColor: "#FFE81F",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    title: {
        color: "#FFE81F",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: 2,
    },
    infoGroup: {
        marginBottom: 15,
    },
    label: {
        color: "#FFE81F",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        letterSpacing: 1,
    },
    info: {
        color: "#FFF",
        fontSize: 16,
        lineHeight: 24,
    },
});

export default CharacterDetailScreen;