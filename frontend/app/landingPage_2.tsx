import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const IMAGES = [
    require("../assets/images/Farmers market-rafiki.png"),
    require("../assets/images/farm tractor-rafiki.png"),
    require("../assets/images/Farmer-rafiki.png"),
    require("../assets/images/fruit basket-rafiki.png"),
];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const LandingPage2 = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/login"); // Navigate to login page
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.imageGrid}>
                    <View style={styles.imageRow}>
                        <View style={[styles.imageWrapper, styles.topLeftImage]}>
                            <Image source={IMAGES[0]} style={styles.image} resizeMode="contain" />
                        </View>
                        <View style={[styles.imageWrapper, styles.topRightImage]}>
                            <Image source={IMAGES[1]} style={styles.image} resizeMode="contain" />
                        </View>
                    </View>
                    <View style={styles.imageRow}>
                        <View style={[styles.imageWrapper, styles.bottomLeftImage]}>
                            <Image source={IMAGES[2]} style={styles.image} resizeMode="contain" />
                        </View>
                        <View style={[styles.imageWrapper, styles.bottomRightImage]}>
                            <Image source={IMAGES[3]} style={styles.image} resizeMode="contain" />
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.bottomSection}>
                <View style={styles.curvedBackground}>
                    <View style={styles.textContent}>
                        <Text style={styles.title}>Get Started</Text>
                        <Text style={styles.description}>Create an account to get started with the app</Text>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.buttonGoogle}>
                            <AntDesign name="google" size={24} color="black" />
                            <Text style={styles.buttonText}>Sign up with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <FontAwesome name="envelope" size={20} color="black" />
                            <Text style={styles.buttonText}>Log in with Your Account</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.loginText}>Don't have an Account? Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    content: {
        flex: 1,
        padding: 16,
    },
    imageGrid: {
        flex: 1,
        justifyContent: "center",
        gap: 20,
        marginTop: 20,
    },
    imageRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    imageWrapper: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },
    topLeftImage: {
        width: SCREEN_WIDTH * 0.35,
        height: SCREEN_WIDTH * 0.35,
        borderRadius: 25,
    },
    topRightImage: {
        width: SCREEN_WIDTH * 0.45,
        height: SCREEN_WIDTH * 0.35,
        borderRadius: 25,
    },
    bottomLeftImage: {
        width: SCREEN_WIDTH * 0.45,
        height: SCREEN_WIDTH * 0.35,
        borderRadius: 25,
    },
    bottomRightImage: {
        width: SCREEN_WIDTH * 0.35,
        height: SCREEN_WIDTH * 0.35,
        borderRadius: 25,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    bottomSection: {
        height: SCREEN_WIDTH * 0.8,
        position: "relative",
    },
    curvedBackground: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "100%",
        backgroundColor: "#02C39A",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 24,
    },
    textContent: {
        marginTop: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        fontSize: 17,
        color: "#FFFFFF",
        opacity: 0.9,
        lineHeight: 24,
        textAlign: "center",
    },
    buttonsContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    buttonGoogle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        width: "90%",
        justifyContent: "center",
        marginBottom: 16,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D9D9D9",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        width: "90%",
        justifyContent: "center",
        marginBottom: 16,
    },
    buttonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 10,
    },
    loginText: {
        color: "white",
        textDecorationLine: "underline",
        fontSize: 15,
        marginTop: 5,
        textAlign: "center",
    },
});

export default LandingPage2;
