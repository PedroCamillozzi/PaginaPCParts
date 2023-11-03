import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class Authentication implements CanActivate{
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {

    const token = localStorage.getItem('token');

    if(token == undefined){
      this.router.navigate(['/home'])
    }

    return true;
  }
}
