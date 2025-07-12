import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Zap, Star, Crown } from 'lucide-react-native';

import GradientBackground from '@/components/ui/GradientBackground';
import AnimatedButton from '@/components/ui/AnimatedButton';
import CreditDisplay from '@/components/ui/CreditDisplay';

const plans = [
  {
    id: 'starter',
    name: 'Starter Plan',
    price: '₹299',
    credits: 12,
    description: '12 x 480p or 6 x 720p videos',
    icon: Zap,
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '₹399',
    credits: 20,
    description: '20 x 480p or 10 x 720p videos',
    icon: Star,
    popular: true,
  },
  {
    id: 'topup',
    name: 'Top-Up Plan',
    price: '₹199',
    credits: 6,
    description: '6 x 480p or 3 x 720p videos',
    icon: Crown,
    popular: false,
  },
];

export default function CreditsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [currentCredits] = useState(2); // Free credits
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handlePurchase = async (planId: string) => {
    setIsProcessing(planId);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(null);
      Alert.alert(
        'Payment Successful!', 
        'Your credits have been added to your account.',
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const renderPlan = (plan: any) => {
    const IconComponent = plan.icon;
    
    return (
      <View
        key={plan.id}
        style={[
          styles.planCard,
          { 
            backgroundColor: isDark ? '#374151' : '#FFFFFF',
            borderColor: plan.popular ? '#8B5CF6' : 'transparent',
            borderWidth: plan.popular ? 2 : 0,
          }
        ]}
      >
        {plan.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Most Popular</Text>
          </View>
        )}
        
        <View style={styles.planHeader}>
          <IconComponent 
            size={32} 
            color={plan.popular ? '#8B5CF6' : '#6B7280'} 
            strokeWidth={2}
          />
          <Text style={[
            styles.planName,
            { color: isDark ? '#F9FAFB' : '#1F2937' }
          ]}>
            {plan.name}
          </Text>
        </View>

        <View style={styles.planPricing}>
          <Text style={[
            styles.planPrice,
            { color: isDark ? '#F9FAFB' : '#1F2937' }
          ]}>
            {plan.price}
          </Text>
          <Text style={[
            styles.planCredits,
            { color: isDark ? '#9CA3AF' : '#6B7280' }
          ]}>
            {plan.credits} credits
          </Text>
        </View>

        <Text style={[
          styles.planDescription,
          { color: isDark ? '#9CA3AF' : '#6B7280' }
        ]}>
          {plan.description}
        </Text>

        <AnimatedButton
          title={isProcessing === plan.id ? "Processing..." : "Purchase"}
          onPress={() => handlePurchase(plan.id)}
          variant={plan.popular ? "primary" : "outline"}
          loading={isProcessing === plan.id}
          style={styles.purchaseButton}
        />
      </View>
    );
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
              Credits & Plans
            </Text>
            <View style={styles.currentCredits}>
              <Text style={[styles.creditsLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                Current Balance
              </Text>
              <CreditDisplay credits={currentCredits} size="large" />
            </View>
          </View>

          {/* Usage Info */}
          <View style={[
            styles.usageCard,
            { backgroundColor: isDark ? '#374151' : '#FFFFFF' }
          ]}>
            <Text style={[styles.usageTitle, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
              Credit Usage
            </Text>
            <View style={styles.usageItem}>
              <Text style={[styles.usageText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                480p Video Generation
              </Text>
              <Text style={[styles.usageCost, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
                1 credit
              </Text>
            </View>
            <View style={styles.usageItem}>
              <Text style={[styles.usageText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                720p Video Generation
              </Text>
              <Text style={[styles.usageCost, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
                2 credits
              </Text>
            </View>
          </View>

          {/* Plans */}
          <Text style={[styles.sectionTitle, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
            Choose Your Plan
          </Text>
          
          {plans.map(renderPlan)}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  currentCredits: {
    alignItems: 'center',
  },
  creditsLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  usageCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  usageTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  usageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  usageText: {
    fontSize: 16,
  },
  usageCost: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  planCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  planHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  planName: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  planPricing: {
    alignItems: 'center',
    marginBottom: 16,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  planCredits: {
    fontSize: 16,
    marginTop: 4,
  },
  planDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  purchaseButton: {
    alignSelf: 'stretch',
  },
});