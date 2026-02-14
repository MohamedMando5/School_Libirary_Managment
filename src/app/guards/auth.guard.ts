import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    map(user => {
      if (user) {
        // checks if route is restricted by role
        if (route.data['roles'] && route.data['roles'].indexOf(user.role) === -1) {
            // role not authorised so redirect to home page
            router.navigate(['/']);
            return false;
        }
        // authorised so return true
        return true;
      }

      // not logged in so redirect to login page with the return url
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    })
  );
};
