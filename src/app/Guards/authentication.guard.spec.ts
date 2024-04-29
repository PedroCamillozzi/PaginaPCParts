import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { authGuard } from '../Guards/authentication.guard';
import { LogueoService } from '../services/logueo.service';

class RouterMock{
  navigate = jest.fn();
}

class LogueoServiceMock{
  tokenExpirado(token:string){
    if(token !== '' || token){
      return true
    }
    return false;
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

  it('should canActivate return == true', ()=>{

    localStorage.setItem('token', 'daTrue');
    
    const token = localStorage.getItem('token') || '';

    const result = logueoServiceMock.tokenExpirado(token)

    expect(result).toBe(true);

    const spyRouterService = jest.spyOn(routerMock, 'navigate');

    expect(spyRouterService).toHaveBeenCalledWith(['/home']);


  });

  it('should canActivate return == false', ()=>{

    localStorage.setItem('token', '');
    
    const token = localStorage.getItem('token') || '';

    const result = logueoServiceMock.tokenExpirado(token)

    expect(result).toBe(false);

  });
 
});
