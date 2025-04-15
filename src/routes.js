import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CharactersScreen from "./pages/CharactersScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import CharacterDetailScreen from "./pages/CharacterDetailScreen";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent'
        },
        headerStyle: {
          backgroundColor: "#000",
          borderBottomWidth: 2,
          borderBottomColor: "#FFE81F",
        },
        headerTitleStyle: {
          color: "#FFE81F",
          fontWeight: "bold",
        },
        headerTintColor: "#FFE81F",
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "CADASTRO" }}
      />
      <Stack.Screen
        name="Characters"
        component={CharactersScreen}
        options={({ navigation }) => ({
          title: "PERSONAGENS",
          headerLeft: null,
          headerRight: () => (
            <Ionicons
              name="log-out-outline"
              size={24}
              color="#FFE81F"
              style={{ marginRight: 15 }}
              onPress={async () => {
                try {
                  await AsyncStorage.removeItem("userToken");
                  navigation.replace("Login");
                } catch (error) {
                  console.error("Erro ao fazer logout:", error);
                }
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{ title: "DETALHES" }}
      />
    </Stack.Navigator>
  );
}