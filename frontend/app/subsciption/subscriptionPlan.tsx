import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SubscriptionPlan() {
  const router = useRouter();

  const premiumFeatures = [
    'Marketplace Insights and Recommendations',
    'Alternative Product and Resource Suggestions',
    'Real-Time Fruit Price Forecasts',
    'Personalized Farming Plan',
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image source={require('../../assets/images/back.png')} style={styles.icon}/>
            
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Explore Premium</Text>
        </View>

        <View style={styles.bannerContainer}>
          <Text style={styles.bannerText}>
          Unlock the Power of Govishakthi Premium Today!
          </Text>
        </View>

        <View style={styles.taglineContainer}>
          <Text style={styles.taglineText}>Grow smarter, earn better.</Text>
          <Text style={styles.offerText}>Try one month for free with Govi Shakthi!</Text>
        </View>

        <View style={styles.featuresContainer}>
          {premiumFeatures.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.pricingContainer}>
          <View style={styles.pricingCard}>
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingType}>Premium</Text>
            </View>
            <View style={styles.pricingContent}>
              <Text style={styles.pricingDuration}>Monthly</Text>
              <Text style={styles.pricingAmount}>100 LKR</Text>
              <Text style={styles.discountText}></Text>
            </View>

          </View>
          <View style={styles.pricingCard}>
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingType}>Premium</Text>
            </View>
            <View style={styles.pricingContent}>
              <Text style={styles.pricingDuration}>Yearly</Text>
              <Text style={styles.pricingAmount}>1000 LKR</Text>
              <Text style={styles.discountText}>16% discount</Text>
            </View>
          </View>
        </View>

        
          <View style={styles.bottomSpace} />

        </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
safeArea: {
    flex: 1,
    backgroundColor: '#00A67E',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#00A67E',
  },

  backButton: {
    padding: 5,
  },

  backButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 15,
  },

  bannerContainer: {
    backgroundColor: '#00A67E',
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  bannerText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 20,
    marginLeft: 20,
    paddingVertical : 40
  },

  icon:{
    width: 24,
    height: 24,
    tintColor: '#000000',
    },

    taglineContainer: {
        alignItems: 'center',
        paddingVertical: 30,
      },

      taglineText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00A67E',
        marginBottom: 5,
      },

      offerText: {
        fontSize: 16,
        color: '#00A67E',
      },

      featuresContainer: {
        backgroundColor: '#c4c0c0',
        borderRadius: 15,
        margin: 20,
        padding: 20,
      },


      featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      },
      

      checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#00A67E',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      },
      
      checkmark: {
        color: '#fff',
        fontWeight: 'bold',
      },

      featureText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
      },

      pricingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
      },

      pricingCard: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#F0F0C0',
        width: '48%',
        borderRadius: 15,
        overflow: 'hidden',
        
      },

      pricingHeader: {
        backgroundColor: '#e4f0a3',
        padding: 10,
        alignItems: 'center',
      },

      pricingType: {
        color: '#00A67E',
        fontWeight: 'bold',
        fontSize: 16,
      },

      pricingContent: {
        backgroundColor: '#F0F0C0',
        padding: 10,
        alignItems: 'center',
      },

      pricingDuration: {
        fontSize: 14,
        color: '#000',
        marginBottom: 5,
        fontWeight: 'bold',
      },

      pricingAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00A67E',
      },

      discountText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
      },

      bottomSpace: {
        height: 40,
      },


});