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

interface PriceInfo {
  value: number;
  unit: string;
}

interface AlternativeProduct {
  name: string;
  cost_to_produce: PriceInfo;
  wholesale_price: PriceInfo;
  retail_price: PriceInfo;
  expected_wholesale_profit: PriceInfo;
  expected_retail_profit: PriceInfo;
}

interface ProductData {
  _id: string;
  fruit_type: string;
  location: string;
  alternative_product: AlternativeProduct;
}

export default function AlternativeProductsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [alternatives, setAlternatives] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlternatives();
  }, []);

  const fetchAlternatives = async () => {
    try {
      const response = await fetch(
        `https://saajid-govishakthi-backend-47235930830.asia-south1.run.app/api/alternatives?fruit_type=${params.fruitType}`
      );
      const data = await response.json();
      setAlternatives(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching alternatives:', error);
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleNext = (item: ProductData) => {
    router.push({
      pathname: '/MarketplaceScreen',
      params: {
        alternativeProduct: item.alternative_product.name
      }
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
        <Text style={styles.headerTitle}>Alternative Products</Text>
      </View>

      <View style={styles.locationHeader}>
        <Text style={styles.locationText}>{params.fruitType} - {params.district}</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00A67E" />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            {alternatives
              .filter(item => item.location === params.district)
              .length === 0 ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  The data is not available yet, we will update soon.
                </Text>
                <TouchableOpacity 
                  style={styles.backToDetailsButton}
                  onPress={() => router.back()}
                >
                  <Text style={styles.backToDetailsText}>Back to Details</Text>
                </TouchableOpacity>
              </View>
            ) : (
              alternatives
                .filter(item => item.location === params.district)
                .map((item, index) => (
                  <TouchableOpacity
                    key={item._id}
                    style={styles.productCard}
                    onPress={() => handleNext(item)}
                  >
                    <Text style={styles.productName}>{item.alternative_product.name}</Text>
                    
                    <View style={styles.priceRow}>
                      <View style={styles.priceItem}>
                        <Text style={styles.priceLabel}>Wholesale Price</Text>
                        <Text style={styles.priceValue}>
                          LKR {formatPrice(item.alternative_product.wholesale_price.value)}
                        </Text>
                      </View>
                      <View style={styles.priceItem}>
                        <Text style={styles.priceLabel}>Retail Price</Text>
                        <Text style={styles.priceValue}>
                          LKR {formatPrice(item.alternative_product.retail_price.value)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.profitRow}>
                      <View style={styles.profitItem}>
                        <Text style={styles.profitLabel}>Expected Wholesale Profit</Text>
                        <Text style={styles.profitValue}>
                          LKR {formatPrice(item.alternative_product.expected_wholesale_profit.value)}
                        </Text>
                      </View>
                      <View style={styles.profitItem}>
                        <Text style={styles.profitLabel}>Expected Retail Profit</Text>
                        <Text style={styles.profitValue}>
                          LKR {formatPrice(item.alternative_product.expected_retail_profit.value)}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.nextButtonContainer}>
                      <Text style={styles.nextButtonText}>View Marketplaces →</Text>
                    </View>
                  </TouchableOpacity>
                ))
            )}
          </ScrollView>
        </View>
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
  locationHeader: {
    backgroundColor: '#E8F5E9',
    padding: 16,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A67E',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCard: {
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
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceItem: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00A67E',
  },
  profitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profitItem: {
    flex: 1,
  },
  profitLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  profitValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 40,
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
    marginTop: 16,
  },
  backToDetailsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
  },
  nextButtonContainer: {
    marginTop: 16,
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
  },
  nextButtonText: {
    color: '#00A67E',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 