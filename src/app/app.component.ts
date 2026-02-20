import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/layout/navbar.component';
import { SidebarComponent } from './components/layout/sidebar.component';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styles: [`
    .app-layout {
      display: flex;
      min-height: calc(100vh - 64px); /* Adjust based on navbar height */
    }
    
    .main-content {
      flex-grow: 1;
      width: 100%;
      background-color: var(--background-color);
    }
  `]
})
export class AppComponent {
  title = 'School Library System';
  isAdmin$: Observable<boolean>;
  
  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.currentUser$.pipe(
      map(user => user?.role === 'ADMIN')
    );
  }
}
