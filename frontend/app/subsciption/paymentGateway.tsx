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


export default function PaymentGateway() {
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

  const handleCardNumberChange = (text) => {
    const formatted = formatCardNumber(text.slice(0, 19));
    setCardNumber(formatted);
  };

  const handleExpiryChange = (text) => {
    const formatted = formatExpiry(text.slice(0, 5));
    setExpiry(formatted);
  };

  const handleCvvChange = (text) => {
    setCvv(text.slice(0, 3));
  };

  const handlePayment = () => {

    router.push('/subsciption/paymentSuccess');
    
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image source={require('../../assets/images/back.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Visa / Master</Text>
        </View>

        
        <View style={styles.paymentContainer}>
          <View style={styles.merchantInfo}>
            <Text style={styles.merchantName}>GoviShakthi PLC</Text>
            <Text style={styles.merchantAddress}>07, Colombo 07</Text>
          </View>

          
          <View style={styles.paymentMethodContainer}>
            <TouchableOpacity 
              style={[
                styles.paymentMethodButton, 
                selectedPaymentMethod === 'visa' && styles.selectedPaymentMethod
              ]}
              onPress={() => setSelectedPaymentMethod('visa')}
            >
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png' }}
                style={styles.cardLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.paymentMethodButton, 
                selectedPaymentMethod === 'mastercard' && styles.selectedPaymentMethod
              ]}
              onPress={() => setSelectedPaymentMethod('mastercard')}
            >
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' }}
                style={styles.cardLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

    
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name on card</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter cardholder name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            <View style={styles.rowContainer}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.inputLabel}>MM/YY</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  value={expiry}
                  onChangeText={handleExpiryChange}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>

              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  value={cvv}
                  onChangeText={handleCvvChange}
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.rememberCardContainer}>
              <Switch
                value={rememberCard}
                onValueChange={setRememberCard}
                trackColor={{ false: '#D9D9D9', true: '#00A67E' }}
                thumbColor="#FFFFFF"
              />
              <Text style={styles.rememberCardText}>Remember my card</Text>
            </View>

            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
              <Text style={styles.payButtonText}>Pay</Text>
            </TouchableOpacity>

            <View style={styles.languageSelector}>
              <Text style={styles.languageText}>English</Text>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/32/32195.png' }} 
                style={styles.dropdownIcon}
              />
            </View>
          </View>
        </View>

        <View style={styles.bottomSpace} />

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

    paymentContainer: {
      padding: 20,
    },

    merchantInfo: {
      marginBottom: 20,
    },

    merchantName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },

    merchantAddress: {
      fontSize: 14,
      color: '#666',
      marginBottom: 15,
    },

    amount: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
    },

    paymentMethodContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },

    paymentMethodButton: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 10,
      marginRight: 15,
      height: 50,
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },

    selectedPaymentMethod: {
      borderColor: '#00A67E',
      borderWidth: 2,
    },

    cardLogoContainer: {
      backgroundColor: '#1A1F71',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 4,
    },

    masterCardLogo: {
      backgroundColor: '#EB001B',
    },

    cardLogoText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
    },

    mastercardText: {
      fontSize: 10,
    },

    formContainer: {
      marginTop: 10,
    },

    inputContainer: {
      marginBottom: 15,
    },

    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },

    inputLabel: {
      fontSize: 14,
      color: '#777',
      marginBottom: 5,
    },

    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 10,
      fontSize: 16,
    },

    rememberCardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },

    rememberCardText: {
      marginLeft: 10,
      fontSize: 14,
      color: '#555',
    },

    payButton: {
      backgroundColor: '#7d7878',
      borderRadius: 8,
      paddingVertical: 15,
      alignItems: 'center',
      marginBottom: 20,
    },

    payButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },

    languageSelector: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    languageText: {
      fontSize: 14,
      color: '#555',
      marginRight: 5,
    },

    dropdownIcon: {
      width: 12,
      height: 12,
      tintColor: '#555',
    },

    bottomSpace: {
      height: 40,
    },

    cardLogo: {
        width: 60,
        height: 30,
      },
      
    
  });