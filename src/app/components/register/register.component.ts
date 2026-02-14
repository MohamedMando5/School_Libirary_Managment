import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Reusing login styles or similar
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['STUDENT', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    
    // Create new user object
    const newUser: User = {
        id: Math.floor(Math.random() * 10000), // simplistic random ID
        name: `${this.f['firstName'].value} ${this.f['lastName'].value}`,
        email: this.f['email'].value,
        password: this.f['password'].value,
        role: this.f['role'].value
    };

    this.authService.register(newUser)
      .subscribe(success => {
        if(success) {
            // Auto login or redirect to login? Let's redirect to login
            this.router.navigate(['/login']);
        } else {
            this.loading = false;
        }
      });
  }
}
