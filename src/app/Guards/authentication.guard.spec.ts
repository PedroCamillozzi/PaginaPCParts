import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';

import { authGuard } from '../Guards/authentication.guard';
import { LogueoService } from '../services/logueo.service';

class RouterMock{
  navigate = jest.fn();
}

class LogueoServiceMock{
  tokenExpirado(token:string){
    if(token === ''){
      return ''
    }
    return 'daTrue';
  }
}

describe('Authentication', () => {
  let routerMock:Router;
  let logueoServiceMock: LogueoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide:Router, useClass:RouterMock},
                  {provide:LogueoService, useClass:LogueoServiceMock}],
    });

    routerMock = TestBed.inject(Router);
    logueoServiceMock = TestBed.inject(LogueoService);
  });

  it('should create', () => {
    expect(authGuard).toBeDefined();
  });


 /* test('should canActivate return == true', () =>{
    localStorage.setItem('token', 'daTrue');

    const token = localStorage.getItem('token');

    const spyLogueoService = jest.spyOn(logueoServiceMock, 'tokenExpirado');

    const resultado = authGuard;
    expect(spyLogueoService).toHaveBeenCalledWith(token);
    expect(resultado).toBe(true);
  });

  test('should canActivate return == false', () =>{
    localStorage.setItem('token', '');

    const token = localStorage.getItem('token');

    const spyLogueoService = jest.spyOn(logueoServiceMock, 'tokenExpirado');
    const spyRouterService = jest.spyOn(routerMock, 'navigate');

    const resultado = authGuard;
    expect(spyLogueoService).toHaveBeenCalledWith(token);
    expect(spyRouterService).toHaveBeenCalledWith(['home/'])
    expect(resultado).toBe(true);
  });*/



 
});
