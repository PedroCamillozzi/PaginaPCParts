import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  
  const routerService = inject(Router);


  const token = localStorage.getItem('token');

  if(token == undefined){
    routerService.navigate(['/home']);
    return false;
  }

  return true;
};
