import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Marketplace {
  _id: string;
  fruit_type: string;
  alternative_product: string;
  marketplace_name: string;
  location: string;
  shop_name: string;
  marketplace_type: string;
  target_audience: string;
  price_range: string;
  selling_strategy: string;
  seasonality: string;
  promotion_method: string;
}

export default function MarketplaceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketplaces();
  }, []);

  const fetchMarketplaces = async () => {
    try {
      const response = await fetch(
        `https://saajid-govishakthi-backend-47235930830.asia-south1.run.app/api/alternatives/rawMaterialMarket?alternative_product=${encodeURIComponent(params.alternativeProduct as string)}`
      );
      const data = await response.json();
      setMarketplaces(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching marketplaces:', error);
      setLoading(false);
    }
  };

  const handleMarketplaceSelect = (marketplace: Marketplace) => {
    router.push({
      pathname: '/MarketplaceDetailsScreen',
      params: { marketplace: JSON.stringify(marketplace) }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Raw Material Marketplaces</Text>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>{params.alternativeProduct}</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00A67E" />
        </View>
      ) : marketplaces.length === 0 ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            The marketplace data is not available yet, we will update soon.
          </Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {marketplaces.map((marketplace) => (
            <TouchableOpacity
              key={marketplace._id}
              style={styles.marketplaceCard}
              onPress={() => handleMarketplaceSelect(marketplace)}
            >
              <Text style={styles.marketplaceName}>{marketplace.marketplace_name}</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>{marketplace.location}</Text>
                <Text style={styles.viewDetailsText}>View Details →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#00A67E',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  subHeader: {
    backgroundColor: '#E8F5E9',
    padding: 16,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A67E',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  marketplaceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  marketplaceName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#666',
  },
  viewDetailsText: {
    color: '#00A67E',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 