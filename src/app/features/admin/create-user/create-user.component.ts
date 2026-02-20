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
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent {

  name = '';
  email = '';
  password = '';
  role = 'ROLE_USER';
  loading = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  createUser() {
    this.loading = true;

    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      roles: [this.role] // 🔥 Admin can choose USER or ADMIN
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.loading = false;
        alert('User/Admin created successfully');
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        alert(err.error?.message || 'Creation failed');
      }
    });
  }
}