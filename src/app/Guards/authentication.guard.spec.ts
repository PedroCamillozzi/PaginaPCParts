import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { authGuard } from '../Guards/authentication.guard';
import { LogueoService } from '../services/logueo.service';
import { RouterTestingModule } from '@angular/router/testing';


class LogueoServiceMock{
  tokenExpirado(token:string){
    if(token !== '' || token){
      return true
    }
    return false;
  }
}

describe('Authentication', () => {
  let routerService:Router;
  let logueoServiceMock: LogueoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      providers: [{provide:LogueoService, useClass:LogueoServiceMock}],
    });
    
    routerService = TestBed.inject(Router);
    logueoServiceMock = TestBed.inject(LogueoService);
  });

  it('should create', () => {
    expect(authGuard).toBeDefined();
  });

  it('should canActivate return == true', async ()=>{
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    localStorage.setItem('token', 'daTrue');
    
    const token = localStorage.getItem('token') || '';

    const spyRouterService = jest.spyOn(routerService, 'navigate');

    const result = logueoServiceMock.tokenExpirado(token)

    const guadResult = await TestBed.runInInjectionContext(() => authGuard(route, state));
    
    expect(spyRouterService).toHaveBeenCalledWith(['/home']);
    expect(result).toBe(true);
    expect(guadResult).toBe(false)


   


  });

  it('should canActivate return == false', async ()=>{
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    localStorage.setItem('token', '');
    
    const token = localStorage.getItem('token') || '';

    const spyRouterService = jest.spyOn(routerService, 'navigate');

    const result = logueoServiceMock.tokenExpirado(token)

    const guadResult = await TestBed.runInInjectionContext(() => authGuard(route, state));

    expect(spyRouterService).not.toHaveBeenCalledWith(['/home'])
    expect(result).toBe(false);
    expect(guadResult).toBe(true)

  });
 
});
