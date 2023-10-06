import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LogueoService } from '../services/logueo.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _authService: LogueoService , private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token') || '';
    if (this._authService.tokenExpirado(token)) {
      return true;
    } else {
      // Redirige a la página de inicio de sesión si no está autenticado
      this.router.navigate(['home']);
      return false;
    }
  }
}
