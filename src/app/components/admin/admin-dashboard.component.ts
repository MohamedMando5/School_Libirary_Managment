import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(private bookService: BookService) {
    this.books$ = this.bookService.getBooks();
  }

  ngOnInit(): void {}

  deleteBook(id: number) {
    if(confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id);
    }
  }
}
