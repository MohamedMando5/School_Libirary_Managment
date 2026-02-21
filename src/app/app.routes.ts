import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { BookFormComponent } from './components/admin/book-form/book-form.component';
import { BookListComponent } from './components/user/book-list.component';
import { BookDetailComponent } from './components/user/book-detail/book-detail.component';
import { BorrowedBooksComponent } from './components/user/borrowed-books/borrowed-books.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { 
        path: 'admin', 
        component: AdminDashboardComponent, 
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
    },
    { 
        path: 'admin/books/add', 
        component: BookFormComponent, 
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
    },
    { 
        path: 'admin/books/edit/:id', 
        component: BookFormComponent, 
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
    },
    { 
        path: 'books', 
        component: BookListComponent,
        canActivate: [authGuard],
        data: { roles: ['STUDENT', 'ADMIN'] }
    },
    { 
        path: 'books/:id', 
        component: BookDetailComponent,
        canActivate: [authGuard],
        data: { roles: ['STUDENT', 'ADMIN'] }
    },
    { 
        path: 'my-books', 
        component: BorrowedBooksComponent,
        canActivate: [authGuard],
        data: { roles: ['STUDENT'] }
    },
    {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard],
        data: { roles: ['STUDENT', 'ADMIN'] }
    },
    // Fallback
    { path: '**', redirectTo: '/login' }
];
