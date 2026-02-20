import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class UserDashboardComponent {

  private router = inject(Router);

  goToAccounts() {
    this.router.navigate(['/accounts']);
  }

  goToTransactions() {
    this.router.navigate(['/transactions']);
  }
}