import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard = (expectedRole: string): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const role = authService.getUserRole();

    if (role === expectedRole) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  };
};
