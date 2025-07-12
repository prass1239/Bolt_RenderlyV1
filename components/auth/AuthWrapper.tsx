import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';

import GradientBackground from '@/components/ui/GradientBackground';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface AuthWrapperProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  onLogin: (email: string, password: string) => void;
  onGoogleLogin: () => void;
}

export default function AuthWrapper({ 
  children, 
  isAuthenticated, 
  onLogin, 
  onGoogleLogin 
}: AuthWrapperProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleEmailLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await onLogin(email, password);
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await onGoogleLogin();
    } catch (error) {
      Alert.alert('Error', 'Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GradientBackground variant="secondary">
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            {/* Logo/Title */}
            <View style={styles.header}>
              <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
                Renderly
              </Text>
              <Text style={[styles.subtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                AI Video Generation Made Simple
              </Text>
            </View>

            {/* Auth Form */}
            <View style={[
              styles.formContainer,
              { backgroundColor: isDark ? '#374151' : '#FFFFFF' }
            ]}>
              <Text style={[
                styles.formTitle,
                { color: isDark ? '#F9FAFB' : '#1F2937' }
              ]}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </Text>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper,
                  { 
                    backgroundColor: isDark ? '#4B5563' : '#F9FAFB',
                    borderColor: isDark ? '#6B7280' : '#E5E7EB',
                  }
                ]}>
                  <Mail size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
                  <TextInput
                    style={[
                      styles.input,
                      { color: isDark ? '#F9FAFB' : '#1F2937' }
                    ]}
                    placeholder="Email address"
                    placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper,
                  { 
                    backgroundColor: isDark ? '#4B5563' : '#F9FAFB',
                    borderColor: isDark ? '#6B7280' : '#E5E7EB',
                  }
                ]}>
                  <Lock size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
                  <TextInput
                    style={[
                      styles.input,
                      { color: isDark ? '#F9FAFB' : '#1F2937' }
                    ]}
                    placeholder="Password"
                    placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <AnimatedButton
                    title=""
                    onPress={() => setShowPassword(!showPassword)}
                    variant="outline"
                    style={styles.passwordToggle}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
                    ) : (
                      <Eye size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
                    )}
                  </AnimatedButton>
                </View>
              </View>

              {/* Login Button */}
              <AnimatedButton
                title={isSignUp ? 'Create Account' : 'Sign In'}
                onPress={handleEmailLogin}
                loading={isLoading}
                style={styles.loginButton}
              />

              {/* Divider */}
              <View style={styles.divider}>
                <View style={[
                  styles.dividerLine,
                  { backgroundColor: isDark ? '#6B7280' : '#E5E7EB' }
                ]} />
                <Text style={[
                  styles.dividerText,
                  { color: isDark ? '#9CA3AF' : '#6B7280' }
                ]}>
                  or
                </Text>
                <View style={[
                  styles.dividerLine,
                  { backgroundColor: isDark ? '#6B7280' : '#E5E7EB' }
                ]} />
              </View>

              {/* Google Login */}
              <AnimatedButton
                title="Continue with Google"
                onPress={handleGoogleLogin}
                variant="outline"
                loading={isLoading}
                style={styles.googleButton}
              />

              {/* Switch between Sign In / Sign Up */}
              <View style={styles.switchContainer}>
                <Text style={[
                  styles.switchText,
                  { color: isDark ? '#9CA3AF' : '#6B7280' }
                ]}>
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </Text>
                <AnimatedButton
                  title={isSignUp ? 'Sign In' : 'Sign Up'}
                  onPress={() => setIsSignUp(!isSignUp)}
                  variant="outline"
                  size="small"
                  style={styles.switchButton}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  passwordToggle: {
    padding: 0,
    minHeight: 'auto',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  googleButton: {
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  switchText: {
    fontSize: 14,
    marginRight: 8,
  },
  switchButton: {
    paddingHorizontal: 0,
    minHeight: 'auto',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});