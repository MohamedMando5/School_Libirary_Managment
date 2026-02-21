import { Book } from '../models/book.model';
import { User } from '../models/user.model';

export const MOCK_BOOKS: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    description: 'A novel set in the Roaring Twenties.',
    coverImage: 'book1.ico',
    totalCopies: 5,
    availableCopies: 3
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Classic',
    description: 'A novel about the serious issues of rape and racial inequality.',
    coverImage: 'book2.ico',
    totalCopies: 3,
    availableCopies: 0
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopian',
    description: 'A social science fiction novel and cautionary tale.',
    coverImage: 'book3.ico',
    totalCopies: 10,
    availableCopies: 10
  },
    {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Romance',
    description: 'A romantic novel of manners.',
    coverImage: 'book4.ico',
    totalCopies: 4,
    availableCopies: 2
  },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    category: 'Fiction',
    description: 'A story about teenage rebellion.',
    coverImage: 'book5.ico',
    totalCopies: 6,
    availableCopies: 5
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@library.com',
    password: 'admin',
    role: 'ADMIN',
    phone: '01000000001',
    address: 'Cairo, Egypt',
    isActive: true,
    createdAt: '2026-01-01',
    department: 'Management'
  },
  {
    id: 2,
    name: 'John Student',
    email: 'student@library.com',
    password: 'user',
    role: 'STUDENT',
    phone: '01000000002',
    address: 'Giza, Egypt',
    isActive: true,
    createdAt: '2026-01-05',
    studentId: 'ST1001',
    department: 'Computer Science'
  },
  {
    id: 3,
    name: 'Sarah Ahmed',
    email: 'sarah@library.com',
    password: 'user123',
    role: 'STUDENT',
    phone: '01000000003',
    address: 'Alexandria, Egypt',
    isActive: true,
    createdAt: '2026-01-10',
    studentId: 'ST1002',
    department: 'Engineering'
  },
  {
    id: 4,
    name: 'Michael Admin',
    email: 'michael@library.com',
    password: 'admin123',
    role: 'ADMIN',
    phone: '01000000004',
    address: 'Cairo, Egypt',
    isActive: true,
    createdAt: '2026-01-02',
    department: 'IT'
  },
  {
    id: 5,
    name: 'Ali Hassan',
    email: 'ali@library.com',
    password: 'user456',
    role: 'STUDENT',
    phone: '01000000005',
    address: 'Tanta, Egypt',
    isActive: false,
    createdAt: '2026-01-15',
    studentId: 'ST1003',
    department: 'Business'
  },
  {
    id: 6,
    name: 'Mona Ibrahim',
    email: 'mona@library.com',
    password: 'user789',
    role: 'STUDENT',
    phone: '01000000006',
    address: 'Mansoura, Egypt',
    isActive: true,
    createdAt: '2026-01-20',
    studentId: 'ST1004',
    department: 'Pharmacy'
  }
];