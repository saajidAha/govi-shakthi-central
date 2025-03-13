import React, { useEffect } from 'react';
import { Slot, Stack } from 'expo-router'; 
import { StatusBar } from 'expo-status-bar';
import { MarketProvider } from './context/MarketContext';
import { YieldProvider } from './context/YieldContext';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

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
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="edit-profile" options={{headerShown: false}} />
          <Stack.Screen name="price-prediction" options={{ headerShown: false }} />
          <Stack.Screen name="yield-prediction" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </YieldProvider>
    </MarketProvider>
  )
}