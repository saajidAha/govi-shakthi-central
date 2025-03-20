import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';

const welcomeScreen = () => {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const buttonBounceAnim = useRef(new Animated.Value(1)).current;
  const dotPulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 100,
      tension: 40,
      useNativeDriver: true,
    }).start();

    Animated.loop(
        Animated.sequence([
          Animated.timing(dotPulseAnim, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(dotPulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
    ).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(buttonBounceAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonBounceAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      router.push('/landingPage_1');
    });
  };

  return (
      <View style={styles.container}>
        <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              }
            ]}
        >
          <Image
              source={require('../assets/images/GoviShakthi Logo.png')}
              style={styles.logo}
              resizeMode="contain"
          />
          <Animated.Text
              style={[
                styles.tagline,
                {
                  opacity: fadeAnim,
                }
              ]}
          >
            Your Smart Farming Companion
          </Animated.Text>
        </Animated.View>

        <View style={styles.bottomContent}>
          <Animated.View
              style={{
                width: '100%',
                transform: [{ scale: buttonBounceAnim }],
              }}
          >
            <TouchableOpacity
                style={styles.button}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                activeOpacity={1}
            >
              <Text style={styles.buttonText}>Explore More</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: Dimensions.get('window').width * 0.6,
    height: 100,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginTop: 8,
  },
  bottomContent: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#00BF8F',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
  },
});

export default welcomeScreen;
