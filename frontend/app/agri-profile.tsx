import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  TextInput,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function AgriProfileScreen() {
  const router = useRouter();
  const [farmName, setFarmName] = useState('Green Valley Farm');
  const [farmSize, setFarmSize] = useState('5 acres');
  const [mainCrops, setMainCrops] = useState('Rice, Vegetables, Fruits');
  const [farmingExperience, setFarmingExperience] = useState('15 years');
  const [farmLocation, setFarmLocation] = useState('Anuradhapura, Sri Lanka');

  const handleSave = () => {
    // Backend Logic
    Alert.alert('Agri Profile Updated', 'Your farming profile has been successfully updated.');
    router.back();
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
            <Image source={require('../assets/images/back.png')} style={styles.icon}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Agri Profile</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Farm Name</Text>
            <TextInput
              style={styles.input}
              value={farmName}
              onChangeText={setFarmName}
              placeholder="Enter your farm name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Farm Size</Text>
            <TextInput
              style={styles.input}
              value={farmSize}
              onChangeText={setFarmSize}
              placeholder="Enter your farm size"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Main Crops</Text>
            <TextInput
              style={styles.input}
              value={mainCrops}
              onChangeText={setMainCrops}
              placeholder="Enter your main crops"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Farming Experience</Text>
            <TextInput
              style={styles.input}
              value={farmingExperience}
              onChangeText={setFarmingExperience}
              placeholder="Enter your farming experience"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Farm Location</Text>
            <TextInput
              style={styles.input}
              value={farmLocation}
              onChangeText={setFarmLocation}
              placeholder="Enter your farm location"
            />
          </View>

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    marginLeft: 15,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#00A67E',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon:{
    width: 24,
    height: 24,
    tintColor: '#000000',
  },
});