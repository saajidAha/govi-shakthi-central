import React from 'react';
import { Redirect } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function App() {
    return <Redirect href="/WelcomeScreen" />;
}

// Keeping styles in case they're referenced elsewhere
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A9DFA3',
    },
    navbar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    profileButton: {
        padding: 8,
    },
});
