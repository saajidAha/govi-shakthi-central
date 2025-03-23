import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [usernameParam, setUsernameParam] = useState(params.username ? String(params.username) : '');
  
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const initializeUsername = async () => {
      try {
        // If username is not in params, try to get it from AsyncStorage
        if (!usernameParam) {
          const storedUsername = await AsyncStorage.getItem('currentUsername');
          if (storedUsername) {
            setUsernameParam(storedUsername);
            console.log('Using username from AsyncStorage:', storedUsername);
          } else {
            // Fallback to default if needed
            setUsernameParam('sasindu123');
            console.log('No username found, using default');
          }
        }
        
        // Now fetch user data with the username we have
        fetchUserData();
      } catch (error: any) {
        console.error('Error initializing username:', error);
        setLoading(false);
      }
    };
    
    initializeUsername();
  }, []);

  const fetchUserData = async () => {
    try {
      if (!usernameParam) {
        console.log('No username available yet, waiting...');
        return;
      }
      
      setLoading(true);
      const url = `https://saajid-govishakthi-backend-47235930830.asia-south1.run.app/api/user?username=${usernameParam}`;
      console.log('Fetching user data from:', url);
      
      const response = await fetch(url);
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }
      
      const userData = await response.json();
      console.log('User data received:', userData);
      
      // Check if we have the expected data structure
      if (userData) {
        setEmail(userData.email || '');
        setPhone(userData.phone || '');
        setLocation(userData.location || '');
        setName(userData.name || '');
        setUsername(userData.username || usernameParam);
        console.log('User data set to state');
      } else {
        console.error('Invalid user data structure:', userData);
        Alert.alert('Error', 'Invalid user data received from server');
      }
      
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', `Failed to load user data: ${error.message || 'Unknown error'}`);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!username.trim() || !name.trim() || !email.trim() || !phone.trim() || !location.trim()) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    
    try {
      setUpdating(true);
      
      const updateData = {
        username: usernameParam, // Use the original username for identifying the user
        name: name,
        location: location,
        email: email,
        phone: phone
      };
      
      console.log('Sending update data:', updateData);
      
      const response = await fetch(
        'https://saajid-govishakthi-backend-47235930830.asia-south1.run.app/api/updateUser',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        }
      );
      
      console.log('Update response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to update user data: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Update result:', result);
      
      setUpdating(false);
      Alert.alert('Success', 'Your profile has been successfully updated.');
      router.back();
    } catch (error: any) {
      setUpdating(false);
      console.error('Error updating user data:', error);
      Alert.alert('Error', `Failed to update profile: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: confirmDeleteAccount,
        },
      ],
      { cancelable: true }
    );
  };

  const confirmDeleteAccount = async () => {
    try {
      setUpdating(true);
      
      const deleteData = {
        username: usernameParam
      };
      
      console.log('Deleting account for username:', usernameParam);
      
      const response = await fetch(
        'https://saajid-govishakthi-backend-47235930830.asia-south1.run.app/api/deleteUser',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(deleteData)
        }
      );
      
      console.log('Delete response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to delete account: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Delete result:', result);
      
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('currentUsername');
      
      setUpdating(false);
      Alert.alert(
        'Account Deleted',
        'Your account has been successfully deleted.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/'),
          },
        ]
      );
    } catch (error: any) {
      setUpdating(false);
      console.error('Error deleting account:', error);
      Alert.alert('Error', `Failed to delete account: ${error.message || 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00A67E" />
          <Text style={styles.loadingText}>Loading profile data...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter your location"
            />
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, updating && styles.disabledButton]}
            onPress={handleSave}
            disabled={updating}
          >
            {updating ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.deleteButton, updating && styles.disabledButton]}
            onPress={handleDeleteAccount}
            disabled={updating}
          >
            <Text style={styles.deleteButtonText}>Delete Account</Text>
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
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
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
  deleteButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF3B30',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  disabledButton: {
    backgroundColor: '#8DCFBE',
  },
});