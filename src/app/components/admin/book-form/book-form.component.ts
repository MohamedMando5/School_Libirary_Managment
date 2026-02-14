import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  loading = false;
  submitted = false;
  isEditMode = false;
  bookId: number | null = null;
  
  categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Classic', 'Fantasy', 'Romance', 'Dystopian'];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      coverImage: ['', Validators.required],
      totalCopies: [1, [Validators.required, Validators.min(1)]],
      availableCopies: [1] // Hidden, manageable via total copies logic usually, but for now simple
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.bookId = +id;
      this.bookService.getBook(this.bookId).subscribe(book => {
        if(book) {
            this.bookForm.patchValue(book);
        }
      });
    }
  }

  get f() { return this.bookForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.bookForm.invalid) {
      return;
    }

    this.loading = true;
    
    const bookData: Book = {
        id: this.bookId || 0,
        ...this.bookForm.value
    };
    
    // Simplistic handling for available copies on create/update logic (demo purpose)
    // If creating, available = total. If update, we might need to adjust based on current diff, 
    // but let's just assume we reset available if total changes or user manually updates it. 
    // For this simple form, we'll sync available with total on create. 
    if (!this.isEditMode) {
        bookData.availableCopies = bookData.totalCopies;
    } else {
        // If updating, we might want to keep existing available count unless total changed?
        // Let's not complicate and just update everything.
    }

    const action$ = this.isEditMode 
      ? this.bookService.updateBook(bookData)
      : this.bookService.addBook(bookData);

    action$.subscribe(() => {
        this.router.navigate(['/admin']);
    });
  }
}
