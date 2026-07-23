import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const usuario = authService.usuarioActual();

  if (usuario?.rol === 'Administrador') {
    return true;
  }

  router.navigate(['/']);
  return false;
};
