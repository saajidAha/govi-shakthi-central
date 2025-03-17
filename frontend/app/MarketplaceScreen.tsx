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
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

interface BaseMarketplace {
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

interface RawMarketplace extends BaseMarketplace {}

interface SellingMarketplace extends BaseMarketplace {
  supplier_relationship: string;
  ingredients_required: string[];
}

export default function MarketplaceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [rawMarketplaces, setRawMarketplaces] = useState<RawMarketplace[]>([]);
  const [sellingMarketplaces, setSellingMarketplaces] = useState<SellingMarketplace[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Promise.all([
      fetchRawMarketplaces(),
      fetchSellingMarketplaces()
    ]).then(() => setLoading(false));
  }, []);

  const fetchRawMarketplaces = async () => {
    try {
      const response = await fetch(
        `https://saajid-govishakthi-backend-47235930830.asia-south1.run.app/api/alternatives/rawMaterialMarket?alternative_product=${encodeURIComponent(params.alternativeProduct as string)}`
      );
      const data = await response.json();
      setRawMarketplaces(data);
    } catch (error) {
      console.error('Error fetching raw marketplaces:', error);
    }
  };

  const fetchSellingMarketplaces = async () => {
    try {
      const response = await fetch(
        `https://saajid-govishakthi-backend-47235930830.asia-south1.run.app/api/alternatives/market?alternative_product=${encodeURIComponent(params.alternativeProduct as string)}`
      );
      const data = await response.json();
      setSellingMarketplaces(data);
    } catch (error) {
      console.error('Error fetching selling marketplaces:', error);
    }
  };

  const handleMarketplaceSelect = (marketplace: BaseMarketplace, type: 'raw' | 'selling') => {
    router.push({
      pathname: '/MarketplaceDetailsScreen',
      params: { 
        marketplace: JSON.stringify(marketplace),
        marketplaceType: type
      }
    });
  };

  const MarketplaceSection = ({ 
    title, 
    marketplaces, 
    type 
  }: { 
    title: string; 
    marketplaces: BaseMarketplace[]; 
    type: 'raw' | 'selling' 
  }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {marketplaces.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No {title.toLowerCase()} available yet.
          </Text>
        </View>
      ) : (
        marketplaces.map((marketplace) => (
          <TouchableOpacity
            key={marketplace._id}
            style={styles.marketplaceCard}
            onPress={() => handleMarketplaceSelect(marketplace, type)}
          >
            <Text style={styles.marketplaceName}>{marketplace.marketplace_name}</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>{marketplace.location}</Text>
              <Text style={styles.viewDetailsText}>View Details →</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ backgroundColor: '#00A67E', paddingTop: insets.top }}>
          <StatusBar backgroundColor="#00A67E" barStyle="light-content" />
        </View>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Marketplaces</Text>
          </View>

          <View style={styles.subHeader}>
            <Text style={styles.subHeaderText}>{params.alternativeProduct}</Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#00A67E" />
            </View>
          ) : rawMarketplaces.length === 0 && sellingMarketplaces.length === 0 ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                The marketplace data is not available yet, we will update soon.
              </Text>
              <TouchableOpacity 
                style={styles.backToDetailsButton}
                onPress={() => router.back()}
              >
                <Text style={styles.backToDetailsButtonText}>Back</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.mainContainer}>
              <ScrollView style={styles.container}>
                <MarketplaceSection 
                  title="Raw Material Marketplaces" 
                  marketplaces={rawMarketplaces}
                  type="raw"
                />
                <MarketplaceSection 
                  title="Selling Marketplaces" 
                  marketplaces={sellingMarketplaces}
                  type="selling"
                />
              </ScrollView>
              <View style={styles.homeButtonContainer}>
                <TouchableOpacity 
                  style={styles.homeButton}
                  onPress={() => router.push('/FruitSelectionScreen')}
                >
                  <Text style={styles.homeButtonText}>Go Back Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
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
  backToDetailsButton: {
    backgroundColor: '#00A67E',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backToDetailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  emptyState: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
  },
  homeButtonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  homeButton: {
    backgroundColor: '#00A67E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});