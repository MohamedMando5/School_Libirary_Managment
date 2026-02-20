import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserRole } from '../models/user.model';
import { MOCK_USERS } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<boolean> {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(true);
    }
    return of(false);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(user: User): Observable<boolean> {
    // In a real app, we would add to the backend. Here we just add to mock list (in memory)
    // For simplicity, we won't persist registration across reloads unless we use local storage for the whole list
    // But let's just mimic success
    MOCK_USERS.push(user);
    return of(true);
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'ADMIN';
  }

  getUserCount(): Observable<number> {
    return of(MOCK_USERS.length);
  }
}
