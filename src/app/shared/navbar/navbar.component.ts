import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  role = '';
  userName = 'John Doe'; // Replace with actual user data from AuthService
  dropdownOpen = false;

  ngOnInit(): void {
    this.role = this.authService.getUserRole() || 'user';
    // If your AuthService provides a username:
    // this.userName = this.authService.getUserName() || 'User';
  }

  getInitials(): string {
    return this.userName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  navigateTo(path: string): void {
    this.dropdownOpen = false;
    this.router.navigate([path]);
  }

  logout(): void {
    this.dropdownOpen = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}