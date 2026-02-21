import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Book } from '../models/book.model';
import { MOCK_BOOKS } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [...MOCK_BOOKS]; // Copy mock data
  private booksSubject = new BehaviorSubject<Book[]>(this.books);

  constructor() {
    this.loadFavoritesFromStorage();
  }

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

  toggleFavorite(bookId: number): Observable<void> {
    const book = this.books.find(b => b.id === bookId);
    if (book) {
      book.isFavorite = !book.isFavorite;
      this.saveFavoritesToStorage();
      this.booksSubject.next(this.books);
    }
    return of(void 0);
  }

  getFavorites(): Observable<Book[]> {
    return this.getBooks().pipe(
      map((books: Book[]) => books.filter((b: Book) => b.isFavorite))
    );
  }

  private loadFavoritesFromStorage() {
    const favorites = localStorage.getItem('favoriteBookIds');
    if (favorites) {
      const ids: number[] = JSON.parse(favorites);
      this.books.forEach(book => {
        if (ids.includes(book.id)) {
          book.isFavorite = true;
        }
      });
      this.booksSubject.next(this.books);
    }
  }

  private saveFavoritesToStorage() {
    const favoriteIds = this.books
      .filter(b => b.isFavorite)
      .map(b => b.id);
    localStorage.setItem('favoriteBookIds', JSON.stringify(favoriteIds));
  }
}
