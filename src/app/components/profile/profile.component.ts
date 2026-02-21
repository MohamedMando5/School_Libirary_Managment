// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserRole } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm: FormGroup;
  isEditing = false;
  isLoading = true;
  isSaving = false;
  
  // For role-based conditional display
  userRole: UserRole | null = null;


  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.createForm();
  }

  ngOnInit(): void {
  this.authService.currentUser$.subscribe(user => {
    this.user = user;
    this.userRole = user?.role || null;

    if (user) {
      this.updateFormWithUserData();
    }

    this.isLoading = false;
  });
  console.log(this.authService.currentUser$);
}
  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[+]?[0-9\s-]{10,}$')]],
      address: [''],
      studentId: [''],
      department: ['']
    });
  }

  private updateFormWithUserData(): void {
    if (this.user) {
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone || '',
        address: this.user.address || '',
        studentId: this.user.studentId || '',
        department: this.user.department || ''
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.updateFormWithUserData(); // Reset form if cancel
    }
  }

  onSubmit(): void {
  if (this.profileForm.valid && this.user) {
    this.isSaving = true;

    const updatedUser: User = {
      ...this.user,
      ...this.profileForm.value,
      role: this.user.role
    };

    setTimeout(() => {
      this.user = updatedUser;

      // Update AuthService + localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      this.authService['currentUserSubject'].next(updatedUser);

      this.isEditing = false;
      this.isSaving = false;

      console.log('Profile updated successfully');
    }, 1000);
  } else {
    this.markFormGroupTouched(this.profileForm);
  }
}
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Getters for form controls
  get nameControl() { return this.profileForm.get('name'); }
  get emailControl() { return this.profileForm.get('email'); }
  get phoneControl() { return this.profileForm.get('phone'); }
  
  // Helper methods for template
  hasError(controlName: string, errorName: string): boolean {
    const control = this.profileForm.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}