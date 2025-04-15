import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            if (userData) {
                const parsedData = JSON.parse(userData);
                if (parsedData.email === username && parsedData.password === password) {
                    navigation.replace("Characters");
                } else {
                    Alert.alert("Erro", "Credenciais inválidas");
                }
            } else {
                Alert.alert("Erro", "Nenhum usuário cadastrado");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>STAR WARS</Text>
                <Text style={styles.subTitle}>O Despertar da API</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#999"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>ENTRAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={[styles.buttonText, { color: "#FFE81F" }]}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    titleContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    mainTitle: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#FFE81F",
        textTransform: "uppercase",
        letterSpacing: 5,
        textShadowColor: "rgba(255, 232, 31, 0.8)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    subTitle: {
        fontSize: 18,
        color: "#FFE81F",
        marginTop: 10,
        letterSpacing: 2,
        textShadowColor: "rgba(255, 232, 31, 0.5)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    inputContainer: {
        marginHorizontal: 30,
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: "#FFE81F",
        borderWidth: 2,
        marginBottom: 20,
        padding: 15,
        color: "#FFF",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: 5,
        fontSize: 16,
    },
    buttonContainer: {
        marginHorizontal: 30,
    },
    loginButton: {
        backgroundColor: "#FFE81F",
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: "center",
    },
    registerButton: {
        backgroundColor: "transparent",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FFE81F",
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default LoginScreen;