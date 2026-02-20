import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../../app/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/user/accounts';

  getMyAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl);
  }
}