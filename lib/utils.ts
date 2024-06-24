import { Post } from '@/types';

export const validatePost = (post: Omit<Post, 'id'>) => {
  return {
    title: {
      valid: post.title.length > 0,
      message: 'Title is required',
    },
    body: {
      valid: post.body.length > 0,
      message: 'Body is required',
    },
  };
};
