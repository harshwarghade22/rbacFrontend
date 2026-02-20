import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse, Transaction } from '../../app/models/transaction.model';
import { AccountTransaction } from '../models/account-transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/admin';

  getTransactions(page = 0, size = 10): Observable<PageResponse<Transaction>> {
    return this.http.get<PageResponse<Transaction>>(
      `${this.baseUrl}/transactions?page=${page}&size=${size}`
    );
  }

  getTransactionsByAccount(accountId: number, page = 0, size = 10): Observable<PageResponse<AccountTransaction>> {
    return this.http.get<PageResponse<AccountTransaction>>(
      `http://localhost:8080/api/user/transactions/${accountId}?page=${page}&size=${size}`
    );
  }

  exportTransactions(accountId: number) {
    return this.http.get(
      `http://localhost:8080/api/user/export/transactions/${accountId}`,
      { responseType: 'text' } // VERY IMPORTANT (backend returns String URL)
    );
  }
}
