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
      <div class="navbar-brand">
        <a routerLink="/">CheckOut</a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a routerLink="/books" class="navbar-item">Books</a>
          <a *ngIf="user.role === 'STUDENT'" routerLink="/my-books" class="navbar-item">My Books</a>
          <a *ngIf="user.role === 'ADMIN'" routerLink="/admin" class="navbar-item">Admin Dashboard</a>
        </div>
        <div class="navbar-end">
          <span class="navbar-item user-name">Welcome, {{user.name}}</span>
          <a (click)="logout()" class="navbar-item btn-logout">Logout</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .navbar-brand a {
      font-size: 1.5rem;
      font-weight: bold;
      color: #1a73e8;
      text-decoration: none;
    }

    .navbar-menu {
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
      align-items: center;
      margin-left: 2rem;
    }

    .navbar-start, .navbar-end {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .navbar-item {
      color: #5f6368;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: #1a73e8;
      }
    }

    .btn-logout {
      color: #d93025;
      &:hover {
        color: #a50e0e;
      }
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
}
