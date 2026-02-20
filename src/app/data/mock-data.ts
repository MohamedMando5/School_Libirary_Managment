import { Book } from '../models/book.model';
import { User } from '../models/user.model';

export const MOCK_BOOKS: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    description: 'A novel set in the Roaring Twenties.',
    coverImage: 'public/book1.ico',
    totalCopies: 5,
    availableCopies: 3
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Classic',
    description: 'A novel about the serious issues of rape and racial inequality.',
    coverImage: 'public/book2.ico',
    totalCopies: 3,
    availableCopies: 0
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopian',
    description: 'A social science fiction novel and cautionary tale.',
    coverImage: 'public/book3.ico',
    totalCopies: 10,
    availableCopies: 10
  },
    {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Romance',
    description: 'A romantic novel of manners.',
    coverImage: 'public/book4.ico',
    totalCopies: 4,
    availableCopies: 2
  },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    category: 'Fiction',
    description: 'A story about teenage rebellion.',
    coverImage: 'public/book5.ico',
    totalCopies: 6,
    availableCopies: 5
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@library.com',
    password: 'admin', // Simple password for demo
    role: 'ADMIN'
  },
  {
    id: 2,
    name: 'John Student',
    email: 'student@library.com',
    password: 'user',
    role: 'STUDENT'
  }
];
