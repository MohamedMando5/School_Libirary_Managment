import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar" *ngIf="isAdmin$ | async">
      <div class="sidebar-header">
        <h3>Admin Panel</h3>
      </div>
      <nav class="sidebar-nav">
        <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="sidebar-link">
          <span class="icon">📊</span> Dashboard
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background-color: #ffffff;
      border-right: 1px solid var(--border-color);
      height: calc(100vh - 60px); /* Adjust based on navbar height */
      position: sticky;
      top: 60px;
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      transition: width 0.3s ease;
    }

    .sidebar-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    
    .sidebar-header h3 {
      font-size: 1.1rem;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0;
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1rem;
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: var(--border-radius-sm);
      transition: all 0.2s ease;
      font-weight: 500;
      font-size: 0.95rem;
    }

    .sidebar-link:hover {
      background-color: #e3f2fd; /* Lightest blue */
      color: var(--primary-color);
      transform: translateX(4px);
    }

    .sidebar-link.active {
      background-color: #e3f2fd;
      color: var(--primary-color);
      font-weight: 600;
      box-shadow: 2px 0 0 var(--primary-color) inset;
    }
    
    .icon {
      font-size: 1.25rem;
      width: 24px;
      text-align: center;
    }
  `]
})
export class SidebarComponent {
  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.currentUser$.pipe(
      map(user => user?.role === 'ADMIN')
    );
  }
}
