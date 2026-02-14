import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { AuthService } from '../../../services/auth.service';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;
  loading = true;
  borrowing = false;
  message = '';
  isStudent = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authService: AuthService
  ) {
      this.isStudent = this.authService.currentUserValue?.role === 'STUDENT';
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id).subscribe(book => {
      this.book = book;
      this.loading = false;
    });
  }

  borrowBook() {
    if (!this.book) return;
    
    this.borrowing = true;
    this.bookService.borrowBook(this.book.id).subscribe(success => {
      this.borrowing = false;
      if (success) {
        this.message = 'Book borrowed successfully!';
        // Refresh book data
        if(this.book) this.book.availableCopies--;
        
        // Redirect to borrowed books after a delay
        setTimeout(() => {
            this.router.navigate(['/books']);
        }, 1500);
      } else {
        this.message = 'Failed to borrow book. It might be unavailable.';
      }
    });
  }
}
