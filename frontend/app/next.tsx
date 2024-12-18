import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const NextScreen: React.FC = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/next_2'); // Navigate to the next step
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