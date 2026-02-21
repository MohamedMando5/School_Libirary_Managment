export type UserRole = 'ADMIN' | 'STUDENT';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Should be hashed in real apps
  role: UserRole;

  // New fields
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt: string;

  // Optional student/admin info
  studentId?: string;
  department?: string;
}