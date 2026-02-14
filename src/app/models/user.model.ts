export type UserRole = 'ADMIN' | 'STUDENT';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // In a real app, this wouldn't be here or would be hashed
  role: UserRole;
}
