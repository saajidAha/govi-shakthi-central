import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
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

export default function MarketplaceDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const marketplace: Marketplace = JSON.parse(params.marketplace as string);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Marketplace Details</Text>
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
}); 