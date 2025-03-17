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
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDemand } from '../context/DemandContext';

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

export default function DemandPredictionScreen() {
  const router = useRouter();
  const { selectedDistrict, setSelectedDistrict, fruits, isLoading } = useDemand();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setIsDropdownOpen(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Image source={require('../../assets/images/back.png')} style={styles.icon}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Demand Prediction</Text>
        </View>

        {/* District Selector */}
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>Select Your District</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text style={styles.dropdownText}>
              {selectedDistrict || 'Choose a district'}
            </Text>
            <Image source={require('../../assets/images/chevronright.png')} style={styles.chevronIcon}/>
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              {districts.map((district) => (
                <TouchableOpacity
                  key={district}
                  style={[
                    styles.dropdownItem,
                    selectedDistrict === district && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleDistrictSelect(district)}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    selectedDistrict === district && styles.dropdownItemTextSelected,
                  ]}>
                    {district}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Fruit Cards */}
        <View style={styles.fruitsContainer}>
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loaderText}>Loading demand data...</Text>
            </View>
          ) : fruits.length > 0 ? (
            fruits.map((fruit) => (
              <View
                key={fruit.id}
                style={[styles.fruitCard, { backgroundColor: fruit.backgroundColor }]}
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
                  <Text style={styles.predictedDemand}>
                    Demand Prediction: {fruit.predictedDemand.toFixed(2)} kg
                  </Text>
                  <Text style={styles.marketName}>
                    Market: {fruit.market}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {selectedDistrict 
                  ? 'No demand data available for this district'
                  : 'Select a district to view demand predictions'}
              </Text>
            </View>
          )}
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
  selectorContainer: {
    padding: 20,
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
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemSelected: {
    backgroundColor: '#E8F5E9',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownItemTextSelected: {
    color: '#00A67E',
    fontWeight: 'bold',
  },
  fruitsContainer: {
    padding: 20,
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
  predictedDemand: {
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

  icon:{
    width: 24,
    height: 24,
    tintColor: '#fff',
  },

chevronIcon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },

});