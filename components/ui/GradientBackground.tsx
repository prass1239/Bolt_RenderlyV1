import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';

interface GradientBackgroundProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'subtle';
}

export default function GradientBackground({ 
  children, 
  variant = 'primary' 
}: GradientBackgroundProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return isDark 
          ? ['#1F2937', '#111827', '#0F172A']
          : ['#F8FAFC', '#F1F5F9', '#E2E8F0'];
      case 'secondary':
        return isDark
          ? ['#312E81', '#1E1B4B', '#1F2937']
          : ['#EDE9FE', '#DDD6FE', '#C4B5FD'];
      case 'subtle':
        return isDark
          ? ['#374151', '#1F2937']
          : ['#F9FAFB', '#F3F4F6'];
      default:
        return isDark 
          ? ['#1F2937', '#111827']
          : ['#FFFFFF', '#F9FAFB'];
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});