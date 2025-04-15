// App.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import StarBackground from "./src/components/StarBackground";

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <StarBackground>
                <Routes />
            </StarBackground>
        </NavigationContainer>
    );
}