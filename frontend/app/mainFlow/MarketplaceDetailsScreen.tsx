import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
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

export default function MarketplaceDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const marketplace = JSON.parse(params.marketplace as string);
  const marketplaceType = params.marketplaceType as 'raw' | 'selling';
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ backgroundColor: '#00A67E', height: insets.top }}>
          <StatusBar backgroundColor="#00A67E" barStyle="light-content" />
        </View>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {marketplaceType === 'raw' ? 'Raw Material' : 'Selling'} Marketplace
              </Text>
            </View>
            <View style={styles.locationHeader}>
              <Text style={styles.locationText}>{marketplace.fruit_type} - {marketplace.location}</Text>
            </View>
          </View>

          <ScrollView style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.marketplaceName}>{marketplace.marketplace_name}</Text>
              <Text style={styles.shopName}>{marketplace.shop_name}</Text>

              <View style={styles.detailsContainer}>
                <DetailItem label="Location" value={marketplace.location} />
                <DetailItem label="Type" value={marketplace.marketplace_type} />
                <DetailItem label="Target Audience" value={marketplace.target_audience} />
                <DetailItem label="Price Range" value={marketplace.price_range} />
                <DetailItem label="Selling Strategy" value={marketplace.selling_strategy} />
                <DetailItem label="Seasonality" value={marketplace.seasonality} />
                <DetailItem label="Promotion Method" value={marketplace.promotion_method} />
                
                {marketplaceType === 'selling' && (
                  <>
                    <DetailItem 
                      label="Supplier Relationship" 
                      value={(marketplace as SellingMarketplace).supplier_relationship} 
                    />
                    {(marketplace as SellingMarketplace).ingredients_required.length > 0 && (
                      <View style={styles.ingredientsContainer}>
                        <Text style={styles.ingredientsLabel}>Required Ingredients:</Text>
                        {(marketplace as SellingMarketplace).ingredients_required.map((ingredient, index) => (
                          <Text key={index} style={styles.ingredientItem}>• {ingredient}</Text>
                        ))}
                      </View>
                    )}
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#00A67E',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 20,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 20 : 45, // Increased top padding, especially for iOS
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  locationHeader: {
    paddingHorizontal: 24,
  },
  locationText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  marketplaceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  shopName: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  ingredientsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  ingredientsLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ingredientItem: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 4,
  },
});