import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Success</Text>
        </View>

        <View style={styles.content}>
          <Ionicons name="checkmark-circle" size={100} color="#00A67E" style={styles.successIcon} />
          <Text style={styles.successText}>Thank you for your purchase!</Text>
          <Text style={styles.subText}>Your transaction was successful.</Text>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
            <Text style={styles.buttonText}>Go to Home</Text>
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

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 15,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },

  successIcon: {
    marginBottom: 20,
  },

  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00A67E',
    textAlign: 'center',
    marginBottom: 10,
  },

  subText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#00A67E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }


});