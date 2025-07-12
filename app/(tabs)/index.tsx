import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Upload, Wand as Wand2, Play } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

import GradientBackground from '@/components/ui/GradientBackground';
import AnimatedButton from '@/components/ui/AnimatedButton';
import CreditDisplay from '@/components/ui/CreditDisplay';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [credits, setCredits] = useState(2); // Free credits

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const generateVideo = async () => {
    if (!selectedImage || !prompt.trim()) {
      Alert.alert('Missing Information', 'Please select an image and enter a prompt.');
      return;
    }

    if (credits <= 0) {
      Alert.alert('No Credits', 'You need credits to generate videos. Please purchase a plan.');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate API call - replace with actual API call
      setTimeout(() => {
        // Mock generated video URL
        setGeneratedVideo('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
        setCredits(prev => prev - 1);
        setIsGenerating(false);
        Alert.alert('Success!', 'Your video has been generated successfully!');
      }, 3000);
      
    } catch (error) {
      setIsGenerating(false);
      Alert.alert('Error', 'Failed to generate video. Please try again.');
    }
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
              Renderly
            </Text>
            <CreditDisplay credits={credits} />
          </View>

          {/* Image Upload Section */}
          <View style={[
            styles.section,
            { backgroundColor: isDark ? '#374151' : '#FFFFFF' }
          ]}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
              Upload Image
            </Text>
            
            {selectedImage ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                <AnimatedButton
                  title="Change Image"
                  onPress={pickImage}
                  variant="outline"
                  size="small"
                  style={styles.changeImageButton}
                />
              </View>
            ) : (
              <AnimatedButton
                title="Select Image"
                onPress={pickImage}
                variant="outline"
                style={styles.uploadButton}
              />
            )}
          </View>

          {/* Prompt Section */}
          <View style={[
            styles.section,
            { backgroundColor: isDark ? '#374151' : '#FFFFFF' }
          ]}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
              Describe Your Video
            </Text>
            <TextInput
              style={[
                styles.promptInput,
                { 
                  backgroundColor: isDark ? '#4B5563' : '#F9FAFB',
                  color: isDark ? '#F9FAFB' : '#1F2937',
                  borderColor: isDark ? '#6B7280' : '#E5E7EB',
                }
              ]}
              placeholder="A magical transformation scene with sparkles..."
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              value={prompt}
              onChangeText={setPrompt}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Generate Button */}
          <View style={styles.generateSection}>
            <AnimatedButton
              title={isGenerating ? "Generating Magic..." : "Generate Video"}
              onPress={generateVideo}
              loading={isGenerating}
              disabled={!selectedImage || !prompt.trim() || credits <= 0}
              size="large"
              style={styles.generateButton}
            />
          </View>

          {/* Generated Video Section */}
          {generatedVideo && (
            <View style={[
              styles.section,
              { backgroundColor: isDark ? '#374151' : '#FFFFFF' }
            ]}>
              <Text style={[styles.sectionTitle, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
                Your Generated Video
              </Text>
              <Video
                source={{ uri: generatedVideo }}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                shouldPlay={false}
              />
              <View style={styles.videoActions}>
                <AnimatedButton
                  title="Download"
                  onPress={() => Alert.alert('Download', 'Download functionality coming soon!')}
                  variant="secondary"
                  style={styles.actionButton}
                />
                <AnimatedButton
                  title="Share"
                  onPress={() => Alert.alert('Share', 'Share functionality coming soon!')}
                  variant="outline"
                  style={styles.actionButton}
                />
              </View>
            </View>
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  uploadButton: {
    alignSelf: 'center',
    minWidth: 150,
  },
  imageContainer: {
    alignItems: 'center',
  },
  selectedImage: {
    width: width - 80,
    height: (width - 80) * 9 / 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  changeImageButton: {
    marginTop: 8,
  },
  promptInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
  },
  generateSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  generateButton: {
    minWidth: 200,
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  videoActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});