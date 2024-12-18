import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Next2Screen: React.FC = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/mainpage'); // Navigate to the main page
  };

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={require('../assets/images/farmer.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title and Subtitle */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Actionable Insights</Text>
        <Text style={styles.title}>at Your Fingertips</Text>

        {/* Subtitle paragraph split into 4 lines */}
        <Text style={styles.subtitle}>From market trends to</Text>
        <Text style={styles.subtitle}>alternative product ideas,</Text>
        <Text style={styles.subtitle}>get all the information you</Text>
        <Text style={styles.subtitle}>need, all in one place.</Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Pagination Indicator */}
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDotInactive} />
        <View style={styles.paginationDotActive} />
      </View>
    </View>
  );
};

export default Next2Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  image: {
    width: '100%',
    height: 240,
    marginBottom: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#00A886',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00A886',
    marginHorizontal: 4,
  },
  paginationDotInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
});
