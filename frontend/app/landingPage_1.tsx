import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const NextScreen: React.FC = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('.//next_2'); // Navigate to the next step
  };

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={require('../assets/images/farming-illustration.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title and Subtitle */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Personalized Recommendations</Text>
        
        {/* Paragraph broken into 4 lines */}
        <Text style={styles.subtitle}>Input your crop details,</Text>
        <Text style={styles.subtitle}>and we'll guide you with</Text>
        <Text style={styles.subtitle}>tailored recommendations</Text>
        <Text style={styles.subtitle}>based on real-time data and analysis.</Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Pagination Indicator */}
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDotActive} />
        <View style={styles.paginationDotInactive} />
      </View>
    </View>
  );
};

export default NextScreen;

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
    marginBottom: 30, // Adds space between image and title
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40, // Space between text container and button
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 20, // Increased space between title and subtitle
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 5, // Space between subtitle lines
  },
  button: {
    backgroundColor: '#00A886',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20, // Adds spacing before pagination dots
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
    backgroundColor: '#00A886', // Green for active dot
    marginHorizontal: 4,
  },
  paginationDotInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C4C4C4', // Gray for inactive dot
    marginHorizontal: 4,
  },
});
