import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Here you can handle the search functionality
    // For now, we'll just show an alert
    alert(`Searching for: ${searchQuery}`);
    
    // Alternatively, you could navigate to a results page
    // router.push({
    //   pathname: '/search/results',
    //   params: { query: searchQuery }
    // });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Image 
                source={require('../../assets/images/back.png')} 
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' }}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Type here..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>
            
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            {/* You can add footer elements like suggested searches here */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 50,
  },
  searchContainer: {
    width: '100%',
    marginBottom: 30,
  },
  searchBar: {
    backgroundColor: '#F1F3F4',
    borderRadius: 24,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 24,
    paddingVertical: 15,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
});