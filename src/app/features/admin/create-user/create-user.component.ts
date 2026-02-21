import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

  name = '';
  email = '';
  password = '';
  role = 'ROLE_USER';
  loading = false;
  successMessage = '';
  errorMessage = '';
  nameFocused = false;
  emailFocused = false;
  passwordFocused = false;
  showPassword = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  getPasswordStrength(): string {
    const password = this.password;
    if (password.length < 6) return 'weak';
    if (password.length < 12 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return 'medium';
    return 'strong';
  }

  createUser() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      roles: [this.role] // 🔥 Admin can choose USER or ADMIN
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'User/Admin created successfully';
        this.name = '';
        this.email = '';
        this.password = '';
        this.role = 'ROLE_USER';
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMessage = err.error?.message || 'Creation failed';
      }
    });
  }
}