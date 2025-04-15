import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert
} from "react-native";

export default class CadastrarUsuario extends Component {
    state = {
        name: "",
        phone: "",
        cpf: "",
        email: "",
        course: "",
        password: ""
    };

    handleCadastro = async () => {
        const { name, email, password } = this.state;
        if (!name || !email || !password) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios (*)");
            return;
        }

        const userData = {
            name,
            phone: this.state.phone,
            cpf: this.state.cpf,
            email,
            course: this.state.course,
            password
        };

        try {
            await AsyncStorage.setItem("userData", JSON.stringify(userData));
            Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
                {
                    text: "OK",
                    onPress: () => this.props.navigation.navigate("Login")
                }
            ]);
        } catch (error) {
            Alert.alert("Erro", "Falha ao salvar os dados");
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>CADASTRO DE USUÁRIO</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nome *"
                    placeholderTextColor="#999"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    placeholderTextColor="#999"
                    value={this.state.phone}
                    onChangeText={(phone) => this.setState({ phone })}
                    keyboardType="phone-pad"
                />

                <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    placeholderTextColor="#999"
                    value={this.state.cpf}
                    onChangeText={(cpf) => this.setState({ cpf })}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="E-mail *"
                    placeholderTextColor="#999"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Curso"
                    placeholderTextColor="#999"
                    value={this.state.course}
                    onChangeText={(course) => this.setState({ course })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha *"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                />

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={this.handleCadastro}
                >
                    <Text style={styles.buttonText}>SALVAR CADASTRO</Text>
                </TouchableOpacity>

                <Text style={styles.requiredText}>* Campos obrigatórios</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#000",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFE81F",
        textAlign: "center",
        marginBottom: 20,
        textTransform: "uppercase",
    },
    input: {
        height: 50,
        borderColor: "#FFE81F",
        borderWidth: 2,
        marginBottom: 15,
        padding: 15,
        color: "#FFF",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: 5,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#FFE81F",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    },
    requiredText: {
        color: "#FFF",
        fontSize: 12,
        marginTop: 10,
        textAlign: "center",
        fontStyle: "italic",
    },
});