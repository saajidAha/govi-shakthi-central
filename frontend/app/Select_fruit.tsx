import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';

// Define types for our data
interface Fruit {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
}

interface FruitSelectionScreenProps {
    navigation?: any; // For navigation, would be properly typed in a real app
}

const FruitSelectionScreen: React.FC<FruitSelectionScreenProps> = ({ navigation }) => {
    const [selectedFruit, setSelectedFruit] = useState<number | null>(null);

    const fruits: Fruit[] = [
        {
            id: 1,
            name: 'Mango',
            imageUrl: 'https://placehold.co/80x80/FFA500/FFF',
            description: 'Sweet, juicy tropical fruit with yellow-orange flesh. Rich in vitamins A and C.'
        },
        {
            id: 2,
            name: 'Pine Apple',
            imageUrl: 'https://placehold.co/80x80/FFFF00/FFF',
            description: 'Tropical fruit with sweet and tangy flavor. Good source of manganese and vitamin C.'
        },
        {
            id: 3,
            name: 'Oranges',
            imageUrl: 'https://placehold.co/80x80/FFA500/FFF',
            description: 'Citrus fruit packed with vitamin C. Refreshing and tangy taste.'
        },
        {
            id: 4,
            name: 'Wood Apple',
            imageUrl: 'https://placehold.co/80x80/8B4513/FFF',
            description: 'Hard-shelled fruit with aromatic pulp. Popular in South Asian cuisine.'
        },
        {
            id: 5,
            name: 'Strawberry',
            imageUrl: 'https://placehold.co/80x80/FF0000/FFF',
            description: 'Sweet red berries with tiny seeds on the surface. Rich in antioxidants.'
        },
        {
            id: 6,
            name: 'Banana',
            imageUrl: 'https://placehold.co/80x80/FFFF00/FFF',
            description: 'Energy-rich fruit with potassium. Sweet and convenient snack.'
        },
        {
            id: 7,
            name: 'Apple',
            imageUrl: 'https://placehold.co/80x80/FF0000/FFF',
            description: 'Crisp and refreshing fruit available in many varieties. Rich in fiber.'
        },
        {
            id: 8,
            name: 'Kiwi',
            imageUrl: 'https://placehold.co/80x80/32CD32/FFF',
            description: 'Fuzzy brown exterior with bright green flesh. Tangy and sweet.'
        }
    ];

    const handleFruitSelect = (fruitId: number) => {
        setSelectedFruit(fruitId);
    };

    const handleNextPress = () => {
        if (selectedFruit) {
            const selected = fruits.find(fruit => fruit.id === selectedFruit);
            // In a real app, you would navigate to the next screen:
            // navigation.navigate('FruitDetails', { fruit: selected });
            console.log(`Navigating to next screen with: ${selected?.name}`);
        }
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
                <Text style={styles.headerText}>Select the Fruit</Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {fruits.map((fruit) => (
                    <TouchableOpacity
                        key={fruit.id}
                        style={[
                            styles.fruitCard,
                            selectedFruit === fruit.id && styles.selectedCard
                        ]}
                        onPress={() => handleFruitSelect(fruit.id)}
                        activeOpacity={0.8}
                    >
                        <Image
                            source={{ uri: fruit.imageUrl }}
                            style={styles.fruitImage}
                        />
                        <View style={styles.fruitInfo}>
                            <Text style={[
                                styles.fruitName,
                                selectedFruit === fruit.id && styles.selectedText
                            ]}>
                                {fruit.name}
                            </Text>
                            <Text style={[
                                styles.fruitDescription,
                                selectedFruit === fruit.id && styles.selectedDescription
                            ]}>
                                {fruit.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Extra space at bottom for floating button */}
                <View style={styles.bottomSpace} />
            </ScrollView>

            {/* Floating Next Button */}
            <TouchableOpacity
                style={[
                    styles.nextButton,
                    !selectedFruit && styles.disabledButton
                ]}
                onPress={handleNextPress}
                disabled={!selectedFruit}
                activeOpacity={selectedFruit ? 0.8 : 1}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#20B2AA', // teal color
    },
    statusBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    statusText: {
        color: 'white',
        fontWeight: '500',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'black',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 80, // Space for the button
    },
    fruitCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    selectedCard: {
        backgroundColor: '#008B8B', // darker teal
    },
    fruitImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16,
    },
    fruitInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    fruitName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    fruitDescription: {
        fontSize: 14,
        color: '#666',
    },
    selectedText: {
        color: 'white',
    },
    selectedDescription: {
        color: '#E0FFFF', // light cyan
    },
    bottomSpace: {
        height: 60,
    },
    nextButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#008B8B', // darker teal
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    disabledButton: {
        backgroundColor: '#A9A9A9', // gray
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FruitSelectionScreen;