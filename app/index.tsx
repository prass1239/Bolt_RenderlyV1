import React, { useState } from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';

import AuthWrapper from '@/components/auth/AuthWrapper';

export default function IndexScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    // Simulate authentication
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    // Simulate Google authentication
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 1000);
  };

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <AuthWrapper
      isAuthenticated={isAuthenticated}
      onLogin={handleLogin}
      onGoogleLogin={handleGoogleLogin}
    >
      <View />
    </AuthWrapper>
  );
}