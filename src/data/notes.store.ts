export interface Note {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    createdAt: number;
    updatedAt: number;
}

export const notes: Note[] = [];