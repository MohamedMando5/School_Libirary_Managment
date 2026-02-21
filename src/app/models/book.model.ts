export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage: string;
  totalCopies: number;
  availableCopies: number;
  isFavorite?: boolean;
}
