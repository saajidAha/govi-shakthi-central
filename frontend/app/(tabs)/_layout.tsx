import React from 'react';
import { Tabs } from 'expo-router';
import { Image, View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2E6D28',
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        headerShown: false,
        tabBarIconStyle: {
          marginTop: 5,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/images/homeicon.png')} 
              style={[
                styles.tabIcon,
                { tintColor: focused ? '#2E6D28' : '#888888' }
              ]} 
              resizeMode="contain"
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="logo"
        options={{
          title: '',
          tabBarIcon: () => (
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../assets/images/GoviShakthi Logo.png')} 
                style={styles.logo} 
                resizeMode="contain"
              />
            </View>
          ),
          tabBarButton: () => null, // Makes the tab non-clickable
        }}
        listeners={() => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
          },
        })}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/images/settings.png')} 
              style={[
                styles.tabIcon,
                { tintColor: focused ? '#2E6D28' : '#888888' }
              ]} 
              resizeMode="contain"
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            // Navigate to settings screen
            navigation.navigate('settings/settings');
          },
        })}
      />
      
      <Tabs.Screen
        name="profilePage"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/images/profileicon.png')} 
              style={[
                styles.tabIcon,
                { tintColor: focused ? '#2E6D28' : '#888888' }
              ]} 
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    marginTop: -5,
  },
  logo: {
    width: 40,
    height: 40,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});
