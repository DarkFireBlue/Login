import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/AuthService';

export const authGuard: CanActivateFn = (route, state) => {
 
  //obtener el servicio de autenticación
  const authService = inject(AuthService);
 
  //obtener el servicio de navegación
  const router = inject(Router);
 
  //verificar si el usuario tiene una sesion
  if (authService.estaAutenticado()) {
    return true;
  }
  
  //si no está autenticado, se redirige al login
  return router.createUrlTree(['/login']);
};