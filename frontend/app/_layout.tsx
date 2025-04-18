import React, { useEffect } from 'react';
import { Slot, Stack, Redirect } from 'expo-router'; 
import { StatusBar } from 'expo-status-bar';
import { MarketProvider } from './context/MarketContext';
import { YieldProvider } from './context/YieldContext';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { DemandProvider } from './context/DemandContext';

declare global {
  interface Window{
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  useEffect(()=>{
    window.frameworkReady?.();
  },[]);

  return (
    <MarketProvider>
      <YieldProvider>
        <DemandProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="WelcomeScreen" options={{ 
            headerShown: false, 
            animation: 'none',
            contentStyle: { backgroundColor: 'white' }
          }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="edit-profile" options={{headerShown: false}} />
          <Stack.Screen name="price-prediction" options={{ headerShown: false }} />
          <Stack.Screen name="yield-prediction" options={{ headerShown: false }} />
          <Stack.Screen name="demand-prediction" options={{ headerShown: false }} />
        </Stack>
        </DemandProvider>
        <StatusBar style="auto" />
      </YieldProvider>
    </MarketProvider>
  )
}

// Define the root route to redirect to the welcome screen
export function Root() {
  return <Redirect href="/WelcomeScreen" />;
}