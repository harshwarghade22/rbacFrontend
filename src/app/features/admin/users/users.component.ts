import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUserService } from '../../../services/admin-user.service';
import { User } from '../../../models/user.model';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class AdminUsersComponent implements OnInit {

  private userService = inject(AdminUserService);

  users: User[] = [];
  loading = false;
  searchQuery = '';

  get filteredUsers(): User[] {
    if (!this.searchQuery.trim()) {
      return this.users;
    }
    
    const query = this.searchQuery.toLowerCase();
    return this.users.filter(user => 
      (user.name && user.name.toLowerCase().includes(query)) ||
      (user.email && user.email.toLowerCase().includes(query))
    );
  }

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