import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Play, Download, Share } from 'lucide-react-native';
import { Video } from 'expo-av';

import GradientBackground from '@/components/ui/GradientBackground';
import AnimatedButton from '@/components/ui/AnimatedButton';

const { width } = Dimensions.get('window');
const itemWidth = (width - 60) / 2;

// Mock data for generated videos
const mockVideos = [
  {
    id: '1',
    thumbnail: 'https://images.pexels.com/photos/2832039/pexels-photo-2832039.jpeg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    prompt: 'A magical forest with glowing particles',
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    thumbnail: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    prompt: 'Ocean waves with golden sunset',
    createdAt: '1 day ago',
  },
];

export default function GalleryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const renderVideoItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.videoItem,
        { backgroundColor: isDark ? '#374151' : '#FFFFFF' }
      ]}
      onPress={() => setSelectedVideo(selectedVideo === item.id ? null : item.id)}
    >
      <View style={styles.thumbnailContainer}>
        <Video
          source={{ uri: item.videoUrl }}
          style={styles.thumbnail}
          shouldPlay={false}
          resizeMode="cover"
        />
        <View style={styles.playButton}>
          <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
        </View>
      </View>
      
      <View style={styles.videoInfo}>
        <Text style={[
          styles.promptText,
          { color: isDark ? '#F9FAFB' : '#1F2937' }
        ]} numberOfLines={2}>
          {item.prompt}
        </Text>
        <Text style={[
          styles.timeText,
          { color: isDark ? '#9CA3AF' : '#6B7280' }
        ]}>
          {item.createdAt}
        </Text>
      </View>

      {selectedVideo === item.id && (
        <View style={styles.videoActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Download size={20} color="#8B5CF6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#1F2937' }]}>
            My Gallery
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
            {mockVideos.length} videos generated
          </Text>
        </View>

        {mockVideos.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
              No videos yet
            </Text>
            <Text style={[styles.emptySubtext, { color: isDark ? '#6B7280' : '#9CA3AF' }]}>
              Generate your first AI video to see it here
            </Text>
          </View>
        ) : (
          <FlatList
            data={mockVideos}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.gallery}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
          />
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  gallery: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  videoItem: {
    width: itemWidth,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: itemWidth * 0.75,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },
  videoInfo: {
    padding: 12,
  },
  promptText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
  },
  videoActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  actionButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});