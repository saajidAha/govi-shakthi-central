// FruitDetailsScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    ScrollView,
    ImageSourcePropType,
    TextInput,
    Modal,
    StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Define the Fruit interface
interface Fruit {
    id: number;
    name: string;
    description: string;
    image: ImageSourcePropType;
    backgroundColor: string;
}

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Monaragala', 'Ratnapura', 'Kegalle'
];

export default function FruitDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const fruit: Fruit = JSON.parse(params.fruit as string);
    const insets = useSafeAreaInsets();
    
    const [amount, setAmount] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showDistrictPicker, setShowDistrictPicker] = useState(false);

    const handleSubmit = () => {
        // Validate inputs
        if (!amount || !selectedMonth || !selectedDistrict) {
            alert('Please fill in all fields');
            return;
        }

        // Navigate to AlternativeProductsScreen with the fruit type and district
        router.push({
            pathname: '/AlternativeProductsScreen',
            params: {
                fruitType: fruit.name,
                district: selectedDistrict
            }
        });
    };

    return (
        <SafeAreaProvider>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#fff', paddingTop: insets.top }}>
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                </View>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView 
                        style={styles.container}
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ flex: 1 }}>
                            {/* Header */}
                            <View style={styles.header}>
                                <TouchableOpacity 
                                    style={styles.backButton}
                                    onPress={() => router.back()}
                                >
                                    <Text style={styles.backButtonText}>←</Text>
                                </TouchableOpacity>
                                <Text style={styles.headerTitle}>Enter the details</Text>
                            </View>

                            {/* Fruit Card */}
                            <View style={styles.fruitCard}>
                                <View style={styles.imageFrame}>
                                    <Image source={fruit.image} style={styles.fruitImage} resizeMode="cover" />
                                </View>
                                <Text style={styles.fruitName}>{fruit.name}</Text>
                            </View>

                            {/* Form Section */}
                            <View style={styles.formContainer}>
                                {/* Amount Input */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Enter the Amount of Crop</Text>
                                    <View style={styles.amountContainer}>
                                        <TextInput
                                            style={styles.amountInput}
                                            value={amount}
                                            onChangeText={setAmount}
                                            keyboardType="numeric"
                                            placeholder="Enter amount"
                                        />
                                        <View style={styles.unitContainer}>
                                            <Text style={styles.unitText}>KG</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Month Selection */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Harvesting Month</Text>
                                    <TouchableOpacity 
                                        style={styles.picker}
                                        onPress={() => setShowMonthPicker(true)}
                                    >
                                        <Text style={styles.pickerText}>
                                            {selectedMonth || 'Select month'}
                                        </Text>
                                        <Text style={styles.dropdownIcon}>▼</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* District Selection */}
                                <View style={styles.inputGroup}>
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
                                </View>

                                {/* Submit Button */}
                                <TouchableOpacity 
                                    style={styles.submitButton}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.submitButtonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Month Picker Modal */}
                    <Modal
                        visible={showMonthPicker}
                        transparent={true}
                        animationType="slide"
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Select Month</Text>
                                <ScrollView>
                                    {months.map((month) => (
                                        <TouchableOpacity
                                            key={month}
                                            style={styles.modalItem}
                                            onPress={() => {
                                                setSelectedMonth(month);
                                                setShowMonthPicker(false);
                                            }}
                                        >
                                            <Text style={styles.modalItemText}>{month}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <TouchableOpacity
                                    style={styles.modalCloseButton}
                                    onPress={() => setShowMonthPicker(false)}
                                >
                                    <Text style={styles.modalCloseButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

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
                </SafeAreaView>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 8,
    },
    backButtonText: {
        fontSize: 24,
        color: '#000',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 16,
    },
    fruitCard: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    imageFrame: {
        width: 120,
        height: 120,
        borderRadius: 20,
        padding: 2,
        backgroundColor: '#000',
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fruitImage: {
        width: '100%',
        height: '100%',
        borderRadius: 18,
    },
    fruitName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#00A67E',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        paddingBottom: Platform.OS === 'android' ? 40 : 20,
        minHeight: '100%',
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    unitContainer: {
        backgroundColor: '#E0E0E0',
        padding: 12,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    unitText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    picker: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    submitButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00A67E',
    },
});