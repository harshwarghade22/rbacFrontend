import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class AdminDashboardComponent {

  private router = inject(Router);

  goToTransactions() {
    this.router.navigate(['/admin/transactions']);
  }

  createUser() {
    this.router.navigate(['/admin/create-user']);
  }

  manageUsers() {
    this.router.navigate(['/admin/users']);
  }
}
