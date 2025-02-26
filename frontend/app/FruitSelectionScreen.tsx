// FruitDetailsScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Dimensions
} from 'react-native';

// Define the Fruit interface
interface Fruit {
    id: number;
    name: string;
    imageUrl: string;
    description?: string;
}

interface FruitDetailsScreenProps {
    route: {
        params: {
            fruit: Fruit
        }
    };
    navigation: any;
}

const FruitDetailsScreen: React.FC<FruitDetailsScreenProps> = ({ route, navigation }) => {
    // Get the selected fruit from route params
    const { fruit } = route.params;

    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('LBS');
    const [harvestingDistrict, setHarvestingDistrict] = useState('');
    const [sellingDistrict, setSellingDistrict] = useState('');

    const handleBack = () => {
        navigation.goBack();
    };

    const handleUnitToggle = (newUnit: string) => {
        setUnit(newUnit);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Status Bar */}
            <View style={styles.statusBar}>
                <Text style={styles.statusText}>9:30</Text>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>4G</Text>
            </View>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backButtonText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Enter the details</Text>
            </View>

            {/* Selected Fruit Card */}
            <View style={styles.fruitCard}>
                <Image
                    source={{ uri: fruit.imageUrl }}
                    style={styles.fruitImage}
                />
                <View style={styles.fruitNameContainer}>
                    <Text style={styles.fruitName}>{fruit.name}</Text>
                </View>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
                <View style={styles.formField}>
                    <Text style={styles.formLabel}>Enter the Amount of Crop</Text>
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.amountInput}
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="Enter amount"
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                        />
                        <View style={styles.unitToggle}>
                            <TouchableOpacity
                                style={[
                                    styles.unitButton,
                                    unit === 'LBS' && styles.activeUnitButton
                                ]}
                                onPress={() => handleUnitToggle('LBS')}
                            >
                                <Text style={[
                                    styles.unitButtonText,
                                    unit === 'LBS' && styles.activeUnitButtonText
                                ]}>LBS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.unitButton,
                                    unit === 'KG' && styles.activeUnitButton
                                ]}
                                onPress={() => handleUnitToggle('KG')}
                            >
                                <Text style={[
                                    styles.unitButtonText,
                                    unit === 'KG' && styles.activeUnitButtonText
                                ]}>KG</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.formField}>
                    <Text style={styles.formLabel}>Enter Your Harvesting District</Text>
                    <TouchableOpacity style={styles.dropdownInput}>
                        <Text style={styles.dropdownText}>
                            {harvestingDistrict || 'Select district'}
                        </Text>
                        <Text style={styles.dropdownIcon}>▼</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formField}>
                    <Text style={styles.formLabel}>Enter Your Selling District</Text>
                    <TouchableOpacity style={styles.dropdownInput}>
                        <Text style={styles.dropdownText}>
                            {sellingDistrict || 'Select district'}
                        </Text>
                        <Text style={styles.dropdownIcon}>▼</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Navigation Bar */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
                    <Text style={styles.navIcon}>🕒</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>🛒</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>👤</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // Styles remain the same as in previous code
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    statusBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    statusText: {
        color: 'black',
        fontWeight: '500',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'black',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        marginRight: 10,
    },
    backButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    fruitCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        margin: 16,
        marginBottom: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    fruitImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#FFCC00',
    },
    fruitNameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 16,
    },
    fruitName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#00BFA5',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        marginTop: 20,
    },
    formField: {
        marginBottom: 20,
    },
    formLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountInput: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    unitToggle: {
        flexDirection: 'row',
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        marginLeft: 10,
        overflow: 'hidden',
    },
    unitButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeUnitButton: {
        backgroundColor: 'black',
    },
    unitButtonText: {
        fontWeight: 'bold',
        color: 'black',
    },
    activeUnitButtonText: {
        color: 'white',
    },
    dropdownInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 14,
    },
    dropdownText: {
        fontSize: 16,
        color: '#777',
    },
    dropdownIcon: {
        fontSize: 14,
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: 'black',
        paddingVertical: 12,
        justifyContent: 'space-around',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    activeNavItem: {
        backgroundColor: 'white',
        borderRadius: 25,
    },
    navIcon: {
        fontSize: 24,
    },
});

export default FruitDetailsScreen;