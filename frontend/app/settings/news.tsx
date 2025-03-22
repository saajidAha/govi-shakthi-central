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
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function News() {
  const router = useRouter();


  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;
  const currentTime = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
  
  const premiumFeatures = [
    {
      title: 'Market Price Analytics',
      subTitle: 'Real-time Price Trends',
      icon: '📊',

    },
    {
      title: 'Premium Crop Insights',
      subTitle: 'Expert Recommendations',
      icon: '🌿',

    },
    {
      title: 'Weather Forecasts',
      subTitle: 'Advanced Predictions',
      icon: '🌤️',

    },
    {
      title: 'Soil Analysis Reports',
      subTitle: 'Detailed Insights',
      icon: '🌱',
   
    },
    {
      title: 'Farming Community',
      subTitle: 'Connect With Experts',
      icon: '👨‍🌾',

    },
    {
      title: 'Subsidies Tracker',
      subTitle: 'Government Schemes',
      icon: '💰',

    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      	<View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('../../assets/images/back.png')} style={styles.icon}/>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>GOVISHAKTHI</Text>
          <Text style={styles.subTitle}>The country's leading farmer information center</Text>
        </View>
      </View>

      <View style={styles.dateTimeBar}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        {/* Yellow Banner */}
        <View style={styles.yellowBanner}>
          <Text style={styles.bannerTitle}>Today</Text>
        </View>

        <View style={styles.featuresGrid}>
          {premiumFeatures.map((feature, index) => (
            <TouchableOpacity key={index} style={styles.featureCard}>
              {feature.isLive && (
                <View style={styles.liveTag}>
                  <Text style={styles.liveText}>LIVE</Text>
                </View>
              )}

{feature.isNew && (
                <View style={styles.newTag}>
                  <Text style={styles.newText}>NEW</Text>
                </View>
              )}
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureSinhalaTitle}>{feature.title}</Text>
                <Text style={styles.featureEnglishTitle}>{feature.subTitle}</Text>
     
              </View>
            </TouchableOpacity>
          ))}
        </View>
          
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#000',
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
      paddingVertical: 30,
      backgroundColor: '#00A67E',
  
    },
  
     headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      marginLeft: 15,
    },
  
    subTitle: {
      fontSize: 14,
      color: '#d0f0e8',
      marginTop: 4,
      paddingVirtical : 20,
    },
  
    dateTimeBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
  
    currentTimeText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
  
    dateText: {
      fontSize: 14,
      color: '#fff',
    },
  
    yellowBanner: {
      backgroundColor: '#FFD600',
      padding: 16,
      margin: 16,
      borderRadius: 15,
    },
  
    bannerTitle:{
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
      marginLeft: 15,
     },
  
    featuresGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
  
    featureCard: {
      width: '48%',
      backgroundColor: '#222',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      position: 'relative',
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
    },
  });
