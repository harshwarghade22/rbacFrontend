import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit {

  private txnService = inject(TransactionService);

  txns: Transaction[] = [];
  page = 0;
  totalPages = 0;
  loading = false;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.loading = true;
    this.txnService.getTransactions(this.page, this.pageSize).subscribe({
      next: (res) => {
        this.txns = res.content; // IMPORTANT (Page<T>)
        this.totalPages = res.totalPages;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onPageSizeChange(event: any) {
    this.page = 0;
    this.loadTransactions();
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadTransactions();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadTransactions();
    }
  }
}
