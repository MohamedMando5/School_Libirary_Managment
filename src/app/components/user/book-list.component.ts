import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Classic', 'Fantasy', 'Romance', 'Dystopian'];

  constructor(
    private bookService: BookService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.filterBooks();
    });
  }

  filterBooks() {
    this.filteredBooks = this.books.filter(book => {
      const matchTitle = book.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchAuthor = book.author.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchCategory = this.selectedCategory ? book.category === this.selectedCategory : true;
      
      return (matchTitle || matchAuthor) && matchCategory;
    });
  }

  toggleFavorite(book: Book) {
    if (this.authService.currentUserValue) {
      this.bookService.toggleFavorite(book.id);
    }
  }
}
