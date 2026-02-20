import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { Book } from '../../../models/book.model';
import { Location as NgLocation } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book$: Observable<Book | undefined> = new Observable<Book | undefined>();
  loading = true;
  borrowing = false;
  message = '';
  isStudent = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authService: AuthService,
    private location: NgLocation
  ) {
      this.isStudent = this.authService.currentUserValue?.role === 'STUDENT';
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.book$ = this.bookService.getBook(id);
    this.book$.subscribe((book: Book | undefined) => {
      if (book) this.loading = false;
    });
  }

  borrowBook(id: number) {
    this.borrowing = true;
    this.bookService.borrowBook(id).subscribe(success => {
      this.borrowing = false;
      if (success) {
        this.message = 'Book borrowed successfully!';
        // Refresh book data
        // Local refresh is handled in service, but if we need a refresh here we could refetch
        this.book$ = this.bookService.getBook(id);
        
        // Redirect to borrowed books after a delay
        setTimeout(() => {
            this.router.navigate(['/books']);
        }, 1500);
      } else {
        this.message = 'Failed to borrow book. It might be unavailable.';
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
