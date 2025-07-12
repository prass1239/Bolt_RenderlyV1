import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function AnimatedButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: AnimatedButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(0.8, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1, { duration: 150 });
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 16, minHeight: 36 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 32, minHeight: 56 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 24, minHeight: 48 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  const getGradientColors = () => {
    if (disabled) {
      return isDark ? ['#374151', '#4B5563'] : ['#E5E7EB', '#D1D5DB'];
    }
    
    switch (variant) {
      case 'primary':
        return ['#8B5CF6', '#7C3AED'];
      case 'secondary':
        return ['#3B82F6', '#2563EB'];
      default:
        return ['#8B5CF6', '#7C3AED'];
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return isDark ? '#9CA3AF' : '#6B7280';
    }
    
    switch (variant) {
      case 'outline':
        return '#8B5CF6';
      default:
        return '#FFFFFF';
    }
  };

  if (variant === 'outline') {
    return (
      <AnimatedTouchable
        style={[
          styles.button,
          styles.outlineButton,
          getSizeStyles(),
          animatedStyle,
          style,
          disabled && styles.disabled,
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#8B5CF6" />
        ) : (
          <Text 
            style={[
              styles.buttonText, 
              { fontSize: getTextSize(), color: getTextColor() },
              textStyle
            ]}
          >
            {title}
          </Text>
        )}
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedTouchable
      style={[styles.buttonContainer, getSizeStyles(), animatedStyle, style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={1}
    >
      <LinearGradient
        colors={getGradientColors()}
        style={[styles.button, getSizeStyles()]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text 
            style={[
              styles.buttonText, 
              { fontSize: getTextSize(), color: getTextColor() },
              textStyle
            ]}
          >
            {title}
          </Text>
        )}
      </LinearGradient>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
});