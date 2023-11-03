import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Authentication } from './authentication.guard';

describe('Authentication', () => {
  let authGuard: Authentication;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Authentication],
    });

    authGuard = TestBed.inject(Authentication);
  });

  it('should create', () => {
    expect(authGuard).toBeDefined();
  });


  test('should canActivate return == true', () =>{
    const resultado = authGuard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: '/home'});
    expect(resultado).toBe(true);
  });



 
});
