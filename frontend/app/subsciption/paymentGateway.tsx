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
  TextInput,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SubscriptionPlan() {
    const router = useRouter();
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [rememberCard, setRememberCard] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('visa');

  

  const formatCardNumber = (text) => {
    const formattedText = text.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    return formattedText;
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 2) {
      return cleaned;
    } else {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
  };





  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image source={require('../../assets/images/back.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Visa / Master</Text>
        </View>

            


            
            
            
        </View>
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
    icon: {
      width: 24,
      height: 24,
      tintColor: '#000000',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      marginLeft: 15,
    },
    
        
    }
);