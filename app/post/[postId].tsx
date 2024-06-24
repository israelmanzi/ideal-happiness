import CustomButton from '@/components/CustomButton';
import usePosts from '@/hooks/usePosts';
import { Comment, Post } from '@/types';
import Ioicons from '@expo/vector-icons/Ionicons';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostView = () => {
  const { posts, deletePost, deletingPost, fetchComments, isCommentsLoading } =
    usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname) {
      const id = pathname.split('/')[2];

      const idNumber = parseInt(id);

      if (!isNaN(idNumber) && idNumber === 101) {
        // If id is not 101, then search for comments
        const post = posts?.find((p) => parseInt(p.id) === idNumber);
        if (post) {
          setPost(post);
          fetchComments(post.id).then((comments: Comment[]) => {
            setComments(comments);
          });
        }
      } else {
        const post = posts?.find((p) => p.title === id); // If id is 101, use title as id
        if (post) {
          setPost(post);
          setComments([]); // Set comments to null if id is 101 because we didn't create our own comments
        }
      }
    }
  }, [pathname]);

  return post ? (
    <SafeAreaView className="bg-accent h-full p-6">
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          onPress={() => router.push('/')}
          className="flex-row items-center"
        >
          <Ioicons name="arrow-back" size={24} color="#1e293b" />
          <Text className="ml-2 text-lg">Back to posts</Text>
        </TouchableOpacity>
        <CustomButton
          isLoading={deletingPost}
          handlePress={() =>
            parseInt(post.id) === 101
              ? deletePost({ title: post.title, redirect: true })
              : deletePost({ postId: post.id, redirect: true })
          }
          title="Delete post"
          variant="outline"
          containerStyles="w-32 py-1"
        />
      </View>
      <View className="bg-white p-6 rounded-lg shadow-lg">
        <Text className="text-2xl font-bold text-slate-800 mb-4">
          {post.title}
        </Text>
        <Text className="text-base text-slate-600">{post.body}</Text>
      </View>

      <View className="mt-4">
        <Text className="text-xl font-bold mb-2">Comments</Text>
        {comments && comments.length !== 0 ? (
          <FlatList
            data={comments}
            ListEmptyComponent={
              isCommentsLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : null
            }
            keyExtractor={(comment, index) => `${comment.id}-${index}`}
            renderItem={({ item: comment }) => (
              <View className="flex-1 p-3 rounded-lg mb-3 border border-gray-200 shadow-md bg-white">
                <Text className="text-xl font-semibold text-slate-800">
                  {comment.email}
                </Text>
                <Text className="text-base text-gray-600 mb-2 mt-1">
                  {comment.body}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text className="text-2xl">No comments yet</Text>
        )}
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView className="bg-white h-full p-6">
      <TouchableOpacity
        onPress={() => router.push('/')}
        className="flex-row items-center mb-4"
      >
        <Ioicons name="arrow-back" size={24} color="#1e293b" />
        <Text className="ml-2 text-lg">Back to posts</Text>
      </TouchableOpacity>
      <Text className="text-center text-base">
        An error occurred while fetching post! Check your internet connection!
      </Text>
    </SafeAreaView>
  );
};

export default PostView;
