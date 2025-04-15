import React from "react";
import { View, StyleSheet } from "react-native";

const StarBackground = ({ children }) => {
    const stars = Array.from({ length: 100 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        return (
            <View
                key={i}
                style={{
                    position: "absolute",
                    backgroundColor: "#FFF",
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.7 + 0.3,
                }}
            />
        );
    });

    return (
        <View style={styles.container}>
            <View style={styles.starsLayer}>
                {stars}
                {Array.from({ length: 10 }).map((_, i) => (
                    <View
                        key={`large-${i}`}
                        style={{
                            position: "absolute",
                            backgroundColor: "#FFF",
                            width: 4,
                            height: 4,
                            borderRadius: 2,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.8 + 0.2,
                        }}
                    />
                ))}
            </View>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    starsLayer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
    content: {
        flex: 1,
        zIndex: 1,
    },
});

export default StarBackground;