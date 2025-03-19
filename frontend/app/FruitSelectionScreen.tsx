import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import { useRouter } from 'expo-router';

// Define the fruit data structure
interface Fruit {
  id: number;
  name: string;
  description: string;
  image: ImageSourcePropType;
  backgroundColor: string;
}

const fruits: Fruit[] = [
  {
    id: 1,
    name: 'Mango',
    description: 'A juicy and sweet tropical fruit, rich in vitamins and antioxidants.',
    image: { uri: 'https://images.unsplash.com/photo-1553279768-865429fa0078' },
    backgroundColor: '#E6E6FA',
  },
  {
    id: 2,
    name: 'Pineapple',
    description: 'A tangy fruit packed with vitamin C and enzymes that aid digestion.',
    image: { uri: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba' },
    backgroundColor: '#E6E6FA',
  },
  {
    id: 3,
    name: 'Strawberry',
    description: 'A citrus fruit and a great source of vitamin C.',
    image: { uri: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2' },
    backgroundColor: '#E6E6FA',
  },
  {
    id: 4,
    name: 'Woodapple',
    description: 'A hard fruit with a hard shell and aromatic, tangy pulp.',
    image: { uri: 'https://images.unsplash.com/photo-1591300327588-9eb28f1be037' },
    backgroundColor: '#E6E6FA',
  },
  {
    id: 5,
    name: 'Banana',
    description: 'A sweet fruit rich in potassium and natural sugars.',
    image: { uri: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e' },
    backgroundColor: '#E6E6FA',
  },
  {
    id: 6,
    name: 'Avocado',
    description: 'A creamy, nutrient-rich fruit packed with healthy fats and fiber.',
    image: { uri: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578' },
    backgroundColor: '#E6E6FA',
  }
];

export default function FruitSelectionScreen() {
  const router = useRouter();

  const handleFruitSelect = (fruit: Fruit) => {
    router.push({
      pathname: '/FruitDetailsScreen',
      params: { fruit: JSON.stringify(fruit) }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select the Fruit</Text>
        </View>

        {/* Fruit Cards */}
        <View style={styles.cardsContainer}>
          {fruits.map((fruit) => (
            <TouchableOpacity
              key={fruit.id}
              style={[styles.fruitCard, { backgroundColor: fruit.backgroundColor }]}
              onPress={() => handleFruitSelect(fruit)}
            >
              <Image source={fruit.image} style={styles.fruitImage} />
              <View style={styles.fruitInfo}>
                <Text style={styles.fruitName}>{fruit.name}</Text>
                <Text style={styles.fruitDescription}>{fruit.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00A67E',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  cardsContainer: {
    padding: 16,
  },
  fruitCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fruitImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  fruitInfo: {
    flex: 1,
  },
  fruitName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
  },
  fruitDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
