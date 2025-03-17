import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useMarket } from '../context/MarketContext';

const districts = [
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Galle',
  'Matara',
  'Hambantota',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Vavuniya',
  'Mulativu',
  'Batticaloa',
  'Ampara',
  'Trincomalee',
  'Kurunegala',
  'Puttalam',
  'Anuradhapura',
  'Polonnaruwa',
  'Badulla',
  'Monaragala',
  'Ratnapura',
  'Kegalle',
];

export default function PricePredictionScreen() {
  const router = useRouter();
  const { selectedDistrict, setSelectedDistrict, fruits, isLoading } = useMarket();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setIsDropdownOpen(false);
  };

  const handleCancel = () => {
    setIsDropdownOpen(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Price Prediction</Text>
        </View>

        {/* District Selector */}
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>Select Your District</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsDropdownOpen(true)}
          >
            <Text style={styles.dropdownText}>
              {selectedDistrict || 'Choose a district'}
            </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* District Selector Modal */}
        <Modal
          visible={isDropdownOpen}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Your District</Text>
              <ScrollView style={styles.modalList}>
                {districts.map((district) => (
                  <TouchableOpacity
                    key={district}
                    style={styles.modalItem}
                    onPress={() => handleDistrictSelect(district)}
                  >
                    <Text style={styles.modalItemText}>{district}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={handleCancel}
              >
                <Text style={styles.modalCloseButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Fruit Cards */}
        <ScrollView 
          style={styles.fruitsScrollView}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          <View style={styles.fruitsContainer}>
            {isLoading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loaderText}>Loading fruits...</Text>
              </View>
            ) : fruits.length > 0 ? (
              fruits.map((fruit) => (
                <View
                  key={fruit.id}
                  style={[styles.fruitCard, { backgroundColor: fruit.backgroundColor || '#ffffff' }]}
                >
                  <View style={styles.fruitImageContainer}>
                    <Image
                      source={{ uri: fruit.image }}
                      style={styles.fruitImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.fruitInfo}>
                    <Text style={styles.fruitName}>{fruit.name}</Text>
                    <Text style={styles.predictedPrice}>
                      Predicted Price: Rs. {fruit.predictedPrice}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {selectedDistrict 
                    ? 'No fruits available in this district'
                    : 'Select a district to view available fruits'}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Home Button */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push('/(tabs)/home')}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
        
      </View>  
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },

  backButtonText: {
    fontSize: 24,
    color: '#000',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
  selectorContainer: {
    padding: 20,
    zIndex: 1,
  },
  selectorLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },

  dropdownIcon: {
    fontSize: 16,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalList: {
    width: '100%',
    maxHeight: 300,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  fruitsScrollView: {
    flex: 1,
  },
  fruitsContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  fruitCard: {
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fruitImageContainer: {
    width: 120,
    height: 120,
  },
  fruitImage: {
    width: '100%',
    height: '100%',
  },
  fruitInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  fruitName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  predictedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00A67E',
  },
  loaderContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loaderText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  homeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});