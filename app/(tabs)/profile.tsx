import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { User, Mail, Bell, Moon, Sun, LogOut, Settings, ChartBar as BarChart3, History } from 'lucide-react-native';

import GradientBackground from '@/components/ui/GradientBackground';
import AnimatedButton from '@/components/ui/AnimatedButton';
import CreditDisplay from '@/components/ui/CreditDisplay';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(isDark);

  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024',
    videosGenerated: 5,
    creditsUsed: 8,
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          // Handle logout
          Alert.alert('Logged out', 'You have been logged out successfully.');
        }},
      ]
    );
  };

  const renderSettingItem = (
    icon: any, 
    title: string, 
    value?: string, 
    onPress?: () => void, 
    rightComponent?: React.ReactNode
  ) => (
    <View style={[
      styles.settingItem,
      { backgroundColor: isDark ? '#374151' : '#FFFFFF' }
    ]}>
      <View style={styles.settingLeft}>
        {React.createElement(icon, { 
          size: 20, 
          color: isDark ? '#9CA3AF' : '#6B7280',
          strokeWidth: 2 
        })}
        <Text style={[
          styles.settingTitle,
          { color: isDark ? '#F9FAFB' : '#1F2937' }
        ]}>
          {title}
        </Text>
      </View>
      
      <View style={styles.settingRight}>
        {value && (
          <Text style={[
            styles.settingValue,
            { color: isDark ? '#9CA3AF' : '#6B7280' }
          ]}>
            {value}
          </Text>
        )}
        {rightComponent}
      </View>
    </View>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={[
            styles.profileHeader,
            { backgroundColor: isDark ? '#374151' : '#FFFFFF' }
          ]}>
            <View style={styles.avatarContainer}>
              <User size={48} color="#8B5CF6" strokeWidth={2} />
            </View>
            <Text style={[
              styles.userName,
              { color: isDark ? '#F9FAFB' : '#1F2937' }
            ]}>
              {mockUser.name}
            </Text>
            <Text style={[
              styles.userEmail,
              { color: isDark ? '#9CA3AF' : '#6B7280' }
            ]}>
              {mockUser.email}
            </Text>
            <Text style={[
              styles.joinDate,
              { color: isDark ? '#6B7280' : '#9CA3AF' }
            ]}>
              Member since {mockUser.joinDate}
            </Text>
          </View>

          {/* Stats */}
          <View style={[
            styles.statsContainer,
            { backgroundColor: isDark ? '#374151' : '#FFFFFF' }
          ]}>
            <View style={styles.statItem}>
              <Text style={[
                styles.statNumber,
                { color: isDark ? '#F9FAFB' : '#1F2937' }
              ]}>
                {mockUser.videosGenerated}
              </Text>
              <Text style={[
                styles.statLabel,
                { color: isDark ? '#9CA3AF' : '#6B7280' }
              ]}>
                Videos Created
              </Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={[
                styles.statNumber,
                { color: isDark ? '#F9FAFB' : '#1F2937' }
              ]}>
                {mockUser.creditsUsed}
              </Text>
              <Text style={[
                styles.statLabel,
                { color: isDark ? '#9CA3AF' : '#6B7280' }
              ]}>
                Credits Used
              </Text>
            </View>
          </View>

          {/* Settings */}
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? '#F9FAFB' : '#1F2937' }
          ]}>
            Settings
          </Text>

          {renderSettingItem(
            Bell,
            'Notifications',
            undefined,
            undefined,
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            isDark ? Sun : Moon,
            'Theme',
            isDark ? 'Dark' : 'Light',
            undefined,
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(BarChart3, 'Usage Analytics', 'View Stats')}
          {renderSettingItem(History, 'Generation History', 'View All')}
          {renderSettingItem(Settings, 'App Settings', 'Preferences')}

          {/* Logout */}
          <View style={styles.logoutSection}>
            <AnimatedButton
              title="Logout"
              onPress={handleLogout}
              variant="outline"
              style={[
                styles.logoutButton,
                { borderColor: '#EF4444' }
              ]}
              textStyle={{ color: '#EF4444' }}
            />
          </View>
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
  profileHeader: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 8,
  },
  joinDate: {
    fontSize: 14,
  },
  statsContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    marginRight: 8,
  },
  logoutSection: {
    marginTop: 30,
    marginBottom: 40,
  },
  logoutButton: {
    alignSelf: 'stretch',
  },
});