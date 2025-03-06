import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  const accountSettings = [
    { 
      title: 'Edit Profile', 
      description: 'Update your personal information',
      onPress: () => router.push('/edit-profile')
    },
    { 
      title: 'Agri Profile', 
      description: 'Manage your Farming information',
      onPress: () => router.push('/agri-profile')
    },
    { 
      title: 'Privacy', 
      description: 'Control your privacy settings',
      onPress: () => Alert.alert('Privacy', 'Privacy settings will be available soon.')
    },
  ];

  const notificationSettings = [
    { 
      title: 'Prediction Reminders', 
      description: '',
      onPress: () => Alert.alert('Prediction Reminders', 'Prediction reminder settings will be available soon.')
    },
    { 
      title: 'Suggestion Reminders', 
      description: '',
      onPress: () => Alert.alert('Suggestion Reminders', 'Suggestion reminder settings will be available soon.')
    },
    { 
      title: 'Community Updates', 
      description: '',
      onPress: () => Alert.alert('Community Updates', 'Community update settings will be available soon.')
    },
  ];

  const appPreferences = [
    { 
      title: 'Language', 
      description: 'Currently: English',
      onPress: () => Alert.alert('Language', 'Language settings will be available soon.')
    },
    { 
      title: 'Theme', 
      description: 'Light mode',
      onPress: () => Alert.alert('Theme', 'Theme settings will be available soon.')
    },
    { 
      title: 'Region', 
      description: 'Asia',
      onPress: () => Alert.alert('Region', 'Region settings will be available soon.')
    },
    { 
      title: 'App version', 
      description: 'Version 1.0.4',
      onPress: () => Alert.alert('App Version', 'You are using the latest version.')
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            // clear authentication tokens here from backend logic
            router.replace('/');
            Alert.alert('Logged Out', 'You have been successfully logged out.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}> 
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Image source={require('../assets/images/back.png')} style={styles.icon}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Settings Sections */}
        <View style={styles.settingsContainer}>
          {/* Account Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <View style={styles.sectionContent}>
              {accountSettings.map((item, index) => (
                <TouchableOpacity 
                  key={`account-${index}`} 
                  style={styles.settingItem}
                  onPress={item.onPress}
                >
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>{item.description}</Text>
                  </View>
                  <Image source={require('../assets/images/chevronright.png')} style={styles.chevronIcon}/>
                  {index < accountSettings.length - 1 && <View style={styles.divider} />}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.sectionContent}>
              {notificationSettings.map((item, index) => (
                <TouchableOpacity 
                  key={`notification-${index}`} 
                  style={styles.settingItem}
                  onPress={item.onPress}
                >
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    {item.description ? <Text style={styles.settingDescription}>{item.description}</Text> : null}
                  </View>
                  <Image source={require('../assets/images/chevronright.png')} style={styles.chevronIcon}/>
                  {index < notificationSettings.length - 1 && <View style={styles.divider} />}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* App Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Preferences</Text>
            <View style={styles.sectionContent}>
              {appPreferences.map((item, index) => (
                <TouchableOpacity 
                  key={`preference-${index}`} 
                  style={styles.settingItem}
                  onPress={item.onPress}
                >
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>{item.description}</Text>
                  </View>
                  <Image source={require('../assets/images/chevronright.png')} style={styles.chevronIcon}/>
                  {index < appPreferences.length - 1 && <View style={styles.divider} />}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    position: 'relative',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    right: 15,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  logoutButton: {
    backgroundColor: '#00A67E',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
    
  icon:{
    width: 24,
    height: 24,
    tintColor: '#000000',
    },

  chevronIcon: {
    width: 24,
    height: 24,
    tintColor: '#333',
    },
});