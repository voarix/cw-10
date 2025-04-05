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
