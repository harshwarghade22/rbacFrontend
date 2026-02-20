import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserService } from '../../../services/admin-user.service';
import { User } from '../../../models/user.model';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './users.component.html'
})
export class AdminUsersComponent implements OnInit {

  private userService = inject(AdminUserService);

  users: User[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.userService.getAllUsers().subscribe({
      next: (res) => {
        console.log("Admin Users:", res);
        this.users = res;
        this.loading = false;
      },
      error: (err) => {
        console.error("Users API Error:", err);
        this.loading = false;
      }
    });
  }
}