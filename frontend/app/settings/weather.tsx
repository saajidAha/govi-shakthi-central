import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const API_KEY = '42f30d9ffad4c9ddc84d3bd908c10cf8'; // OpenWeatherMap API key

export default function HomeScreen() {
  const [city, setCity] = useState('Colombo'); // Default city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await fetch(URL);
      const data = await response.json();
      console.log('Weather API Response:', data); // Debugging Log
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError(data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={styles.greenHeader}>
            <StatusBar backgroundColor="#00A67E" barStyle="light-content" />
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <View style={styles.weatherContainer}>
                <Text style={styles.cityText}>{weather?.name}</Text>
                <Text style={styles.tempText}>{Math.round(weather?.main?.temp)}°C</Text>
                <Text style={styles.conditionText}>{weather?.weather?.[0]?.description}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter city name"
              value={city}
              onChangeText={setCity}
            />
            <TouchableOpacity style={styles.searchButton} onPress={fetchWeather}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  greenHeader: {
    backgroundColor: '#00A67E',
    height: 200,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  weatherContainer: {
    alignItems: 'center',
  },
  cityText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  tempText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  conditionText: {
    fontSize: 18,
    color: '#fff',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#00A67E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});