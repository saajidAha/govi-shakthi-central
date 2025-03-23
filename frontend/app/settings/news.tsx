import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
  StatusBar,
} from 'react-native';

import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';

export default function News() {
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState(null);
  const [showGoogleSearch, setShowGoogleSearch] = useState(false);
  
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;
  
  const premiumFeatures = [
    {
      title: 'Market Price Analytics',
      subTitle: 'Real-time Price Trends',
      icon: '📊',
      url: 'https://www.statista.com/outlook/cmo/food/fruits-nuts/fresh-fruits/sri-lanka',
    },
    {
      title: 'Premium Crop Insights',
      subTitle: 'Expert Recommendations',
      icon: '🌿',
      url: 'https://www.agrimin.gov.lk/web/index.php/news-scroll?lang=en',
    },
    {
      title: 'Weather Forecasts',
      subTitle: 'Advanced Predictions',
      icon: '🌤️',
      url: 'https://www.accuweather.com/en/lk/sri-lanka-weather',
    },
    {
      title: 'Soil Analysis Reports',
      subTitle: 'Detailed Insights',
      icon: '🌱',
      url: 'https://doa.gov.lk/hordi-services/',
    },
    {
      title: 'Farming Community',
      subTitle: 'Connect With Experts',
      icon: '👨‍🌾',
      url: 'https://sapp.lk/author/sapp/ ',
    },
    {
      title: 'Subsidies Tracker',
      subTitle: 'Government Schemes',
      icon: '💰',
      url: 'https://www.srilankabusiness.com/fruits-and-vegetables/',
    },
  ];

  const openURL = (url) => {
    setCurrentUrl(url);
  };

  const goBackToMain = () => {
    setCurrentUrl(null);
    setShowGoogleSearch(false);
  };

  const openGoogleSearch = () => {
    setShowGoogleSearch(true);
  };

  
  


  if (currentUrl) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.webViewHeader}>
          <TouchableOpacity style={styles.backButton} onPress={goBackToMain}>
            <Image source={require('../../assets/images/back.png')} style={styles.icon}/>
            <Text style={styles.backText}>Back to Govishakthi</Text>
          </TouchableOpacity>
        </View>
        <WebView 
          source={{ uri: currentUrl }} 
          style={styles.webView}
        />
      </SafeAreaView>
    );
  }


  if (showGoogleSearch) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.webViewHeader}>
          <TouchableOpacity style={styles.backButton} onPress={goBackToMain}>
            <Image source={require('../../assets/images/back.png')} style={styles.icon}/>
            <Text style={styles.backText}>Back to Govishakthi</Text>
          </TouchableOpacity>
        </View>
        <WebView 
          source={{ uri: 'https://www.google.com/' }} 
          style={styles.webView}
        />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image source={require('../../assets/images/back.png')} style={styles.icon}/>
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>GoviShakthi</Text>
            <Text style={styles.subTitle}>The country's leading farmer information</Text>
            <Text style={styles.subTitle}>center.</Text>
          </View>
        </View>
          
        <View style={styles.dateTimeBar}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        
        <View style={styles.yellowBanner}>
          <Text style={styles.bannerTitle}>Today's Government Updates</Text>
        </View>

        <View style={styles.featuresGrid}>
          {premiumFeatures.map((feature, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.featureCard}
              onPress={() => openURL(feature.url)}
            >
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureSinhalaTitle}>{feature.title}</Text>
                <Text style={styles.featureEnglishTitle}>{feature.subTitle}</Text>
              </View>
              <View style={styles.linkIndicator}>
                <Text style={styles.linkText}>View Updates</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={openGoogleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>


        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00A67E',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#00A67E',
  },
  titleContainer: {
    flexDirection: 'column',
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 5,
  },
  subTitle: {
    fontSize: 14,
    color: '#d0f0e8',
    marginTop: 4,
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  dateTimeBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 5,
    padding: 0,
    margin: 10,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
  },
  yellowBanner: {
    backgroundColor: '#FFD600',
    padding: 16,
    margin: 16,
    borderRadius: 15,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  featureTextContainer: {
    marginTop: 8,
  },
  featureSinhalaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  featureEnglishTitle: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 2,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#000000',
  },
  backButton: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkIndicator: {
    marginTop: 12,
    backgroundColor: 'rgba(0, 166, 126, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  linkText: {
    color: '#00A67E',
    fontSize: 12,
    fontWeight: 'bold',
  },
  webView: {
    flex: 1,
  },
  webViewHeader: {
    backgroundColor: '#00A67E',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#00A67E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});