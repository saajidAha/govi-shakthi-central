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

        {/* Tagline Section */}
        <View style={styles.taglineContainer}>
          <Text style={styles.taglineText}>Grow smarter, earn better.</Text>
          <Text style={styles.offerText}>Try one month for free with Govi Shakthi!</Text>
        </View>


        </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
safeArea: {
    flex: 1,
    backgroundColor: '#fff',
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

      


});