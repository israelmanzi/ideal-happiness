import usePosts from '@/hooks/usePosts';
import { useRouter } from 'expo-router';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { posts, isLoading, error, setSize, isReachingEnd } = usePosts();
  const router = useRouter();

  const loadMore = () => {
    if (!isReachingEnd) {
      setSize((size) => size + 1);
    }
  };
  return (
    <SafeAreaView className="bg-white h-full px-3 pt-3">
      <View className="flex-row justify-between items-center">
        <Text onPress={() => router.push('/')} className="text-2xl font-bold">
          Posts
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/create-post')}
          className="p-2"
        >
          <Text className="text-base bg-slate-800 border border-slate-800 p-2 rounded-md text-white">
            Create Post
          </Text>
        </TouchableOpacity>
      </View>
      {error ? (
        <View className="h-full flex justify-center items-center bg-gray-50 rounded-lg">
          <Text className="text-lg text-gray-800 pt-3">
            An error occurred while fetching posts! Check your internet
            connection!
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text className="text-lg text-gray-800 pt-3">
                An error occurred while fetching posts! Check your internet
                connection!
              </Text>
            )
          }
          keyExtractor={(post, index) => `${post.id}-${index}`}
          renderItem={({ item: post }) => (
            <TouchableOpacity
              className="p-3 rounded-lg mb-3 border border-gray-200 shadow-md"
              onPress={() => router.push(`/post/${post.id}`)}
            >
              <Text className="text-xl font-semibold text-gray-800">
                {post.title}
              </Text>
              <Text className="text-base text-gray-600 mb-3">{post.body}</Text>
            </TouchableOpacity>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            !isReachingEnd ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}
