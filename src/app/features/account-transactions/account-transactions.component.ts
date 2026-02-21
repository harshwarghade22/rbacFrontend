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
  templateUrl: './account-transactions.component.html',
  styleUrl: './account-transactions.component.scss'
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

  goToFirst(): void {
    this.page = 0;
    this.loadTransactions();
  }

  goToLast(): void {
    this.page = this.totalPages - 1;
    this.loadTransactions();
  }

  goToPage(p: number): void {
    this.page = p;
    this.loadTransactions();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(0, this.page - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible);

    if (end - start < maxVisible) {
      start = Math.max(0, end - maxVisible);
    }

    for (let i = start; i < end; i++) {
      pages.push(i);
    }
    return pages;
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