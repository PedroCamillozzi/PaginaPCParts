import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LogueoService } from '../services/logueo.service';

export const authGuard: CanActivateFn = () => {
  
  const routerService = inject(Router);
  const authService = inject(LogueoService);


  const token = localStorage.getItem('token');

  if(authService.tokenExpirado(token || '')){
    routerService.navigate(['/home']);
    return false;
  }

  return true;
};
