export interface Post {
  id: string;
  title: string;
  body: string;
}

export interface Comment {
  id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
}
