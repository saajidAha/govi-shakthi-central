import React from 'react';
import { Redirect } from 'expo-router';

// This file redirects to the settings screen
export default function SettingsTab() {
  return <Redirect href="/settings/settings" />;
}
