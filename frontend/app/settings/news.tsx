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

  icon: {
    width: 24,
    height: 24,
    tintColor: '#000000',
  },

  backButton: {
    padding: 5,
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
});