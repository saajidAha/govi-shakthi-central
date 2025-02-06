import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const LandingPage = () => {
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Image
              source={require('../assets/images/GoviShakthi-removebg-preview.png')}
              style={styles.logo}
              resizeMode="contain"
          />
          <Text style={styles.tagline}>
            Your Smart Farming Companion
          </Text>
        </View>
        <View style={styles.bottomContent}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Explore More</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: Dimensions.get('window').width * 0.8,
    height: 400,
    marginBottom: 15,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 20,
    fontStyle:"normal",
    color: '#000000',
    textAlign: 'center',
    marginTop: 8,
  },
  bottomContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  button: {
    backgroundColor: '#02C39A',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: Dimensions.get('window').width - 40,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
  },
});

export default LandingPage;
