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