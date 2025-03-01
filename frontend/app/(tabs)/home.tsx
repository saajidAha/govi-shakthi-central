import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';

export default function HomeScreen(){
  return(
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Green header section */}
        <View style={styles.greenHeader}>
          {/* User greeting section */}
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hello Dudley!</Text>
            <Text style={styles.location}>Dudely Sirisena</Text>
            <Text style={styles.subLocation}>Anuradhapura, Sri Lanka</Text>
          </View>
        </View>

        {/* Feature cards grid */}
        <View style={styles.cardsContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>Select Fruit</Text>
              <Image
                source={require('../../assets/images/Home1.jpeg')}
                style={styles.cardImage}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>Price Prediction</Text>
              <Image
                source={require('../../assets/images/Home2.jpeg')}
                style={styles.cardImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>Crop Yield Prediction</Text>
              <Image
                source={require('../../assets/images/Home3.jpeg')}
                style={styles.cardImage}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>Market Demand Prediction</Text>
              <Image
                source={require('../../assets/images/Home4.jpeg')}
                style={styles.cardImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  greenHeader: {
    backgroundColor: '#00A67E',
    padding: 80,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 16,
  },
  greetingContainer: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  location: {
    marginTop: 8,
    fontSize: 18,
    color: '#fff',
  },
  subLocation: {
    fontSize: 14,
    color: '#fff',
  },
  cardsContainer: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 200,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  cardImage: {
    width: '100%', // Fill the card with the image
    height: '100%', 
    borderRadius: 8,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});