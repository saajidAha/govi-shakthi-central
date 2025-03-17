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
import { useYield } from '../context/YieldContext';

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

export default function YieldPredictionScreen() {
  const router = useRouter();
  const { selectedDistrict, setSelectedDistrict, crops, isLoading } = useYield();
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
          <Text style={styles.headerTitle}>Yield Prediction</Text>
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

        {/* Crop Cards */}
        <ScrollView 
          style={styles.cropsScrollView}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          <View style={styles.cropsContainer}>
            {isLoading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loaderText}>Loading crops...</Text>
              </View>
            ) : crops.length > 0 ? (
              crops.map((crop) => (
                <View
                  key={crop.id}
                  style={[styles.cropCard, { backgroundColor: crop.backgroundColor || '#ffffff' }]}
                >
                  <View style={styles.cropImageContainer}>
                    <Image
                      source={{ uri: crop.image }}
                      style={styles.cropImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.cropInfo}>
                    <Text style={styles.cropName}>{crop.name}</Text>
                    <Text style={styles.predictedYield}>
                      Yield Prediction: {crop.predictedYield.toFixed(2)} kg
                    </Text>
                    <Text style={styles.marketName}>
                      Market: {crop.market}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {selectedDistrict 
                    ? 'No crops available in this district'
                    : 'Select a district to view crop predictions'}
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
  cropsScrollView: {
    flex: 1,
  },
  cropsContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  cropCard: {
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
  cropImageContainer: {
    width: 120,
    height: 120,
  },
  cropImage: {
    width: '100%',
    height: '100%',
  },
  cropInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  cropName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  predictedYield: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00A67E',
    marginBottom: 4,
  },
  marketName: {
    fontSize: 14,
    color: '#666',
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