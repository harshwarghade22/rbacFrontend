import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { AccountTransaction } from '../../models/account-transaction.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-account-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './account-transactions.component.html'
})
export class AccountTransactionsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private txnService = inject(TransactionService);

  transactions: AccountTransaction[] = [];
  accountId!: number;
  loading = false;
  page = 0;
  totalPages = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];
  exporting = false;

  ngOnInit(): void {
    this.accountId = Number(this.route.snapshot.paramMap.get('accountId'));
    this.loadTransactions();
  }

  loadTransactions() {
    this.loading = true;
    this.txnService.getTransactionsByAccount(this.accountId, this.page, this.pageSize).subscribe({
      next: (res) => {
        this.transactions = res.content;
        this.totalPages = res.totalPages;
        this.loading = false;
      },
      error: (err) => {
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
  
  exportExcel() {
    this.exporting = true;

    this.txnService.exportTransactions(this.accountId).subscribe({
      next: (presignedUrl: string) => {
        console.log("Download URL:", presignedUrl);

        // Trigger file download automatically
        window.open(presignedUrl, '_blank');

        this.exporting = false;
      },
      error: (err) => {
        console.error("Export Error:", err);
        this.exporting = false;
      }
    });
  }

  
}