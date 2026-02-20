import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  books$: Observable<Book[]>;
  totalBooks$: Observable<number>;
  totalUsers$: Observable<number>;
  activeReservations$: Observable<number>;
  lowStockBooks$: Observable<number>;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private reservationService: ReservationService
  ) {
    this.books$ = this.bookService.getBooks();
    
    this.totalBooks$ = this.books$.pipe(map(books => books.length));
    
    this.lowStockBooks$ = this.books$.pipe(
      map(books => books.filter(b => b.availableCopies < 2).length)
    );

    this.totalUsers$ = this.authService.getUserCount();
    
    this.activeReservations$ = this.reservationService.getReservations().pipe(
        map(res => res.filter(r => r.status === 'ACTIVE').length)
    );
  }

  deleteBook(id: number) {
    if(confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id);
    }
  }
}
