import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Platform, Dimensions, Modal, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Monaragala', 'Ratnapura', 'Kegalle'
];

const SignupPage = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [showDistrictPicker, setShowDistrictPicker] = useState(false);

    const handleSignup = () => {
        // Implement signup logic here
        console.log("Signing up with", name, username, password, confirmPassword, selectedDistrict);
        if (password === confirmPassword) {
            // Passwords match, proceed with signup
            router.push("/(tabs)/home"); // Navigate to home.tsx page after successful signup
        } else {
            // Passwords do not match, display an error message
            alert("Passwords do not match");
        }
    };

    return (
        <View style={styles.outerContainer}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Sign up with your Name, District, User name, and Password.</Text>

                <View style={styles.inputContainer}>
                     {/* Name Input */}
                     <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* District Selection */}
                    <Text style={styles.label}>Enter Your District</Text>
                    <TouchableOpacity
                        style={styles.picker}
                        onPress={() => setShowDistrictPicker(true)}
                    >
                        <Text style={styles.pickerText}>
                            {selectedDistrict || 'Select district'}
                        </Text>
                        <Text style={styles.dropdownIcon}>▼</Text>
                    </TouchableOpacity>

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

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                   
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </SafeAreaView>

            {/* District Picker Modal */}
            <Modal
                visible={showDistrictPicker}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select District</Text>
                        <ScrollView>
                            {districts.map((district) => (
                                <TouchableOpacity
                                    key={district}
                                    style={styles.modalItem}
                                    onPress={() => {
                                        setSelectedDistrict(district);
                                        setShowDistrictPicker(false);
                                    }}
                                >
                                    <Text style={styles.modalItemText}>{district}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setShowDistrictPicker(false)}
                        >
                            <Text style={styles.modalCloseButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    picker: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    pickerText: {
        fontSize: 16,
        color: '#666',
    },
    dropdownIcon: {
        fontSize: 16,
        color: '#666',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalItemText: {
        fontSize: 16,
        color: '#000',
    },
    modalCloseButton: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
});

export default SignupPage;