import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/AuthService';

export const roleguard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const rolespermitidos = route.data['roles'] as Array<string>;

  if (!authService.estaAutenticado()) {
    return router.createUrlTree(['/login']);
  }
  if (authService.tieneRol(rolespermitidos)) {
    return true;
  }
  return router.createUrlTree(['/sin-acceso']);
};
