import { Post } from '@/types';

export const validatePost = (post: Omit<Post, 'id'>) => {
  return {
    title: {
      valid: post.title.length > 3,
      message: 'Title should be more than 3 characters',
    },
    body: {
      valid: post.body.length > 5,
      message: 'Body should be more than 5 characters',
    },
  };
};
