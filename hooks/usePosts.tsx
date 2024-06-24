/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import useSWRInfinite from 'swr/infinite';
import axios from '../lib/axios.config';
import { Post } from '../types';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PAGE_SIZE = 10;

export default function usePosts() {
  const toast = useToast();
  const router = useRouter();
  const [creatingPost, setCreatingPost] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);
  const [isCommentsLoading, setCommentsLoading] = useState(false);

  const getKey = (pageIndex: number, previousPageData: Post[] | null) => {
    if (previousPageData && !previousPageData.length) return null; // Reached the end
    return `/?page=${pageIndex + 1}&limit=${PAGE_SIZE}`;
  };

  const { data, error, size, setSize, mutate } = useSWRInfinite<Post[]>(
    getKey,
    async (url: string) => {
      let storedPosts = await AsyncStorage.getItem('posts');
      if (storedPosts) {
        return JSON.parse(storedPosts);
      } else {
        const { data } = await axios.get(url);
        AsyncStorage.setItem('posts', JSON.stringify(data)); // Store fetched posts in AsyncStorage
        return data;
      }
    }
  );

  const posts = data ? data.flat() : [];
  const isLoading = !error && !data;
  const isReachingEnd = data && data[data.length - 1]?.length < PAGE_SIZE;

  useEffect(() => {
    mutate();
  }, [router]);

  const createPost = async (post: Omit<Post, 'id'>, redirect?: boolean) => {
    setCreatingPost(true);
    try {
      const { data, status } = await axios.post('/', {
        ...post,
      });

      if (status == 201) {
        toast.show('Post created successfully!', {
          type: 'success',
        });

        let asyncPosts = await AsyncStorage.getItem('posts');
        let updatedPosts = [data, ...JSON.parse(asyncPosts || '[]')];
        AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));

        mutate();

        if (redirect) {
          router.push(`/`);
        }
      } else {
        toast.show('An error occurred while creating post!', {
          type: 'danger',
        });
      }
    } catch (error) {
      toast.show('An error occurred!', {
        type: 'danger',
      });
    } finally {
      setCreatingPost(false);
    }
  };

  const deletePost = async ({
    postId,
    title,
    redirect,
  }: {
    postId?: string;
    title?: string;
    redirect?: boolean;
  }) => {
    setDeletingPost(true);

    try {
      if (postId) {
        let asyncPosts = await AsyncStorage.getItem('posts');
        if (asyncPosts) {
          let updatedPosts = JSON.parse(asyncPosts).filter(
            (post: Post) => post.id !== postId
          );
          AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
        }

        const { status } = await axios.delete(`/${postId}`);

        if (status && status == 200) {
          toast.show('Post deleted successfully!', {
            type: 'success',
          });

          mutate();

          if (redirect) {
            router.push(`/`);
          }
        }
      } else if (title) {
        let asyncPosts = await AsyncStorage.getItem('posts');
        if (asyncPosts) {
          let updatedPosts = JSON.parse(asyncPosts).filter(
            (post: Post) => post.title !== title
          );
          AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
        }

        toast.show('Post deleted successfully!', {
          type: 'success',
        });

        mutate();

        if (redirect) {
          router.push(`/`);
        }
      }
    } catch (error) {
      toast.show('An error occurred!', {
        type: 'danger',
      });
    } finally {
      setDeletingPost(false);
    }
  };

  const fetchComments = async (postId: string) => {
    setCommentsLoading(true);
    try {
      const { data, status } = await axios.get(`/${postId}/comments`);

      if (status == 200 && data) {
        mutate();

        return data;
      } else {
        toast.show('No comments!', {
          type: 'danger',
        });
      }
    } catch (error) {
      toast.show('An error occurred while fetching comments!', {
        type: 'danger',
      });
    } finally {
      setCommentsLoading(false);
    }
  };

  return {
    posts,
    isLoading,
    error,
    createPost,
    deletePost,
    creatingPost,
    deletingPost,
    setSize,
    isReachingEnd,
    fetchComments,
    isCommentsLoading,
  };
}
