import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Platform, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const LoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Implement authentication logic here
        console.log("Logging in with", username, password);
    };

    return (
        <View style={styles.outerContainer}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Continue with Account Details</Text>
                <Text style={styles.subtitle}>Sign in with your User name and Password.</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>User Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="User Name"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    container: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
    },
    backButton: {
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000000",
    },
    subtitle: {
        fontSize: 16,
        color: "#555555",
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: "#000000",
        marginBottom: 5,
        fontWeight: "bold",
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "#E0E0E0",
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#02C39A",
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default LoginPage;
