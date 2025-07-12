import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Coins } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

interface CreditDisplayProps {
  credits: number;
  size?: 'small' | 'medium' | 'large';
}

export default function CreditDisplay({ credits, size = 'medium' }: CreditDisplayProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: 14, iconSize: 16, padding: 6 };
      case 'large':
        return { fontSize: 20, iconSize: 24, padding: 12 };
      default:
        return { fontSize: 16, iconSize: 20, padding: 8 };
    }
  };

  const { fontSize, iconSize, padding } = getSizeStyles();

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: isDark ? '#374151' : '#F3F4F6',
        paddingVertical: padding,
        paddingHorizontal: padding * 1.5,
      }
    ]}>
      <Coins 
        size={iconSize} 
        color="#F59E0B" 
        strokeWidth={2}
      />
      <Text style={[
        styles.creditText, 
        { 
          fontSize,
          color: isDark ? '#F9FAFB' : '#1F2937',
          marginLeft: padding / 2,
        }
      ]}>
        {credits}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  creditText: {
    fontWeight: '600',
  },
});