export interface INews {
  id: number;
  title: string;
  description: string;
  image: string | null;
  created_at: string;
}

export interface INewsMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface IComment {
  id: number;
  news_id: number;
  author: string;
  description: string;
}

export type ICommentMutation = Omit<IComment, "id">;
