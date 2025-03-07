import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import WelcomeScreen from '../WelcomeScreen';
import { MarketProvider } from '../context/MarketContext';

export default function App() {
    return (
        <MarketProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                <WelcomeScreen />
            </SafeAreaView>
        </MarketProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A9DFA3',
    },
});
