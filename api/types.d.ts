export interface News {
  id: number;
  title: string;
  description: string;
  image: string | null;
  created_at: string;
}

export interface NewsMutation {
  title: string;
  description: string;
  image: string | null;
}

export interface CommentResponse {
  id: number;
  news_id: number;
  author: string;
  description: string;
}

export type CommentMutation = Omit<CommentResponse, "id">;