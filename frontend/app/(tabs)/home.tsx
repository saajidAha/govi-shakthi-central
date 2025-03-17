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
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ backgroundColor: '#00A67E', paddingTop: insets.top }}>
          <StatusBar backgroundColor="#00A67E" barStyle="light-content" />
        </View>
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
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => router.push('/FruitSelectionScreen')}
                >
                  <Text style={styles.cardTitle}>Select Fruit</Text>
                  <Image
                    source={require('../../assets/images/Home1.jpeg')}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, styles.marketCard]}
                  onPress={() => router.push('/features/price-prediction')}>
                  <Text style={styles.cardTitle}>Price Prediction</Text>
                  <Image
                    source={require('../../assets/images/Home2.jpeg')}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <TouchableOpacity style={[styles.card, styles.cropCard]}
                  onPress={() => router.push('/features/yield-prediction')}>
                  <Text style={styles.cardTitle}>Crop Yield Prediction</Text>
                  <Image
                    source={require('../../assets/images/Home3.jpeg')}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.card, styles.demandCard]}
                  onPress={() => router.push('/features/demand-prediction')}
                >
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
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
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
  fruitCard: {
    backgroundColor: '#FFB6C1',
  },
  marketCard: {
    backgroundColor: '#1E5F74',
    justifyContent: 'space-between',
  },
  cropCard: {
    backgroundColor: '#4A6D7C',
  },
  demandCard: {
    backgroundColor: '#FFD700',
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
    width: '100%',
    height: '100%',
    borderRadius: 8,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
