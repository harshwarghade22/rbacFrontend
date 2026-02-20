import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/auth';

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('roles', JSON.stringify(res.roles));
        })
      );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, request)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('roles', JSON.stringify(res.roles));
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const roles = localStorage.getItem('roles');
    if (!roles) return null;
    try {
      const parsed = JSON.parse(roles);
      return Array.isArray(parsed) ? parsed[0] : null;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    const roles = localStorage.getItem('roles');
    if (!roles) return false;
    try {
      const parsed = JSON.parse(roles);
      return Array.isArray(parsed) && parsed.includes('ROLE_ADMIN');
    } catch {
      return false;
    }
  }

  isUser(): boolean {
    const roles = localStorage.getItem('roles');
    if (!roles) return false;
    try {
      const parsed = JSON.parse(roles);
      return Array.isArray(parsed) && parsed.includes('ROLE_USER');
    } catch {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
  }
}
