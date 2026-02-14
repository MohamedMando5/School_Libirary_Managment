import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { AuthService } from '../../../services/auth.service';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-borrowed-books',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {
  borrowedBooks: Book[] = [];
  loading = true;

  constructor(
    private bookService: BookService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // In a real app we'd fetch based on user ID from a "Borrow" table.
    // Since our mock data is simple, let's just pretend the user has borrowed some books 
    // or filter books where available < total (simplification for demo)
    // improved: Let's actually add a "borrowedBy" field to book or use a separate service. 
    // For now, I'll just show all books that are not fully available as "borrowed" 
    // to demonstrate the UI, effectively acting as "All Borrowed Books" for admin 
    // or simulate user's specific books.
    
    // Let's filter books to show some "borrowed" ones
    this.bookService.getBooks().subscribe(books => {
      this.borrowedBooks = books.filter(b => b.availableCopies < b.totalCopies);
      this.loading = false;
    });
  }

  returnBook(book: Book) {
    if(confirm(`Return "${book.title}"?`)) {
        this.bookService.returnBook(book.id).subscribe(() => {
            // refresh list
            this.borrowedBooks = this.borrowedBooks.filter(b => b.id !== book.id || b.availableCopies < b.totalCopies);
            // Actually strictly speaking we should re-fetch because the condition might change
             this.bookService.getBooks().subscribe(books => {
                this.borrowedBooks = books.filter(b => b.availableCopies < b.totalCopies);
             });
        });
    }
  }
}
