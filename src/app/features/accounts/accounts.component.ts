import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../app/services/account.service';
import { Account } from '../../models/account.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {

  private accountService = inject(AccountService);
  private router = inject(Router);

  accounts: Account[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.loading = true;

    this.accountService.getMyAccounts().subscribe({
      next: (res) => {
        console.log("Accounts Response:", res);
        this.accounts = res;
        this.loading = false;
      },
      error: (err) => {
        console.error("Account API Error:", err);
        this.loading = false;
      }
    });
  }

  viewTransactions(accountId: number) {
    this.router.navigate(['/accounts', accountId, 'transactions']);
  }
}