import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <h2>AMS System</h2>

      <div class="right">
        <span>Role: {{ role }}</span>
        <button (click)="logout()">Logout</button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      background: #1976d2;
      color: white;
    }
    .right {
      display: flex;
      gap: 15px;
      align-items: center;
    }
    button {
      padding: 5px 10px;
      cursor: pointer;
    }
  `]
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  role = this.authService.getUserRole();

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
