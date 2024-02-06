import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (await authService.isLoggedIn()) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
