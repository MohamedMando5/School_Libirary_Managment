import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Book } from '../models/book.model';
import { MOCK_BOOKS } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [...MOCK_BOOKS]; // Copy mock data
  private booksSubject = new BehaviorSubject<Book[]>(this.books);

  constructor() { }

  getBooks(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  getBook(id: number): Observable<Book | undefined> {
    const book = this.books.find(b => b.id === id);
    return of(book);
  }

  addBook(book: Book): Observable<void> {
    book.id = this.books.length > 0 ? Math.max(...this.books.map(b => b.id)) + 1 : 1;
    this.books.push(book);
    this.booksSubject.next(this.books);
    return of(void 0);
  }

  updateBook(book: Book): Observable<void> {
    const index = this.books.findIndex(b => b.id === book.id);
    if (index !== -1) {
      this.books[index] = book;
      this.booksSubject.next(this.books);
    }
    return of(void 0);
  }

  deleteBook(id: number): Observable<void> {
    this.books = this.books.filter(b => b.id !== id);
    this.booksSubject.next(this.books);
    return of(void 0);
  }

  borrowBook(bookId: number): Observable<boolean> {
    const book = this.books.find(b => b.id === bookId);
    if (book && book.availableCopies > 0) {
      book.availableCopies--;
      this.booksSubject.next(this.books);
      return of(true);
    }
    return of(false);
  }

  returnBook(bookId: number): Observable<boolean> {
    const book = this.books.find(b => b.id === bookId);
    if (book && book.availableCopies < book.totalCopies) {
      book.availableCopies++;
      this.booksSubject.next(this.books);
      return of(true);
    }
    return of(false);
  }
}
