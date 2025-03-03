import React, { useEffect } from 'react';
import { Slot, Stack } from 'expo-router'; 
import { StatusBar } from 'expo-status-bar';

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
    <>
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="edit-profile" options={{headerShown: false}} />
      </Stack>
      <StatusBar style="auto" />
    </>
  )
}