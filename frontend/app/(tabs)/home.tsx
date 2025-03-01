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
              <Text style={styles.cardTitle}>Current Market Trends</Text>
              <View style={styles.trendIconContainer}>
                <Image
                  source={require('../../assets/images/Home2.jpeg')}
                  style={styles.trendIcon}
                />
              </View>
              <View style={styles.trendLine} />
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
    padding: 32,
    borderRadius: 20,
    marginBottom: 16,
  },
  greetingContainer: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  location: {
    fontSize: 18,
    color: '#fff',
  },
  subLocation: {
    fontSize: 14,
    color: '#fff',
  },
  cardsContainer: {
    flex: 1,
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
    padding: 16,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardImage: {
    width: 50,
    height: 50,
  },
  trendIconContainer: {
    marginTop: 8,
  },
  trendIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  trendLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFD700',
    marginTop: 8,
  },
});