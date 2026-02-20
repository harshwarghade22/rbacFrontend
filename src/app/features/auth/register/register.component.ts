import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  role = 'ROLE_USER'; // default role

  loading = false;
  error = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onRegister() {
    this.loading = true;
    this.error = '';

    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      roles: ['ROLE_USER'] // 🔥 ALWAYS USER (public signup)
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
