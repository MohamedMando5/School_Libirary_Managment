import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar" *ngIf="currentUser$ | async as user">
      <div class="navbar-container main-container">
        <div class="navbar-brand">
          <a routerLink="/" class="logo">
            <span class="icon">📚</span>
            <span class="text">School Library</span>
          </a>
        </div>
        
        <div class="navbar-menu">
          <div class="navbar-start">
            <a routerLink="/books" class="nav-link" routerLinkActive="active">
              <i class="icon">📖</i> Browse Books
            </a>
            <a *ngIf="user.role === 'STUDENT'" routerLink="/my-books" class="nav-link" routerLinkActive="active">
              <i class="icon">🎒</i> My Books
            </a>
            <a *ngIf="user.role === 'STUDENT'" routerLink="/favorites" class="nav-link" routerLinkActive="active">
              <i class="icon">❤️</i> My Favorites
            </a>
            <a *ngIf="user.role === 'ADMIN'" routerLink="/admin" class="nav-link" routerLinkActive="active">
              <i class="icon">⚙️</i> Admin Dashboard
            </a>
          </div>
          
          <div class="navbar-end">
            <div class="user-profile" (click)="gotoProfile()">
              <span class="avatar">{{user.name.charAt(0)}}</span>
              <span class="user-name">{{user.name}}</span>
              <span class="role-badge" [ngClass]="user.role.toLowerCase()">{{user.role}}</span>
            </div>
            <button (click)="logout()" class="btn btn-sm btn-outline-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08); /* Lighter shadow */
      position: sticky;
      top: 0;
      z-index: 1000;
      border-bottom: 2px solid var(--primary-color);
    }

    .navbar-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 2rem;
      min-height: auto; /* Uses global main-container spacing */
    }

    .navbar-brand .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-color);
      transition: color 0.2s;
    }
    
    .navbar-brand:hover .logo {
      color: var(--primary-dark);
    }

    .navbar-menu {
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
      align-items: center;
      margin-left: 3rem;
    }

    .navbar-start {
      display: flex;
      gap: 1.5rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      padding: 0.5rem 0.75rem;
      border-radius: var(--border-radius-sm);
      transition: all 0.2s ease;
    }

    .nav-link:hover {
      color: var(--primary-color);
      background-color: rgba(13, 71, 161, 0.04);
    }

    .nav-link.active {
      color: var(--primary-color);
      background-color: rgba(13, 71, 161, 0.08);
      font-weight: 600;
    }

    .navbar-end {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding-right: 1rem;
      border-right: 1px solid var(--border-color);
      cursor: pointer;
    }

    .avatar {
      width: 32px;
      height: 32px;
      background-color: var(--accent-color);
      color: #3e2723;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.9rem;
    }

    .user-name {
      font-weight: 500;
      color: var(--text-primary);
    }

    .role-badge {
      font-size: 0.7rem;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    
    .role-badge.admin {
      background-color: #e3f2fd; /* Light blue */
      color: var(--primary-dark);
    }
    
    .role-badge.student {
       background-color: #e0f2f1; /* Light teal */
       color: var(--secondary-dark);
    }
    
    .btn-outline-danger {
      border: 1px solid rgba(211, 47, 47, 0.3);
      color: var(--error-color);
      padding: 0.35rem 0.85rem;
      font-size: 0.85rem;
    }
    
    .btn-outline-danger:hover {
      background-color: #ffebee;
      border-color: var(--error-color);
    }
  `]
})
export class NavbarComponent {
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  gotoProfile() {
    this.router.navigate(['/profile']);
  }
}
