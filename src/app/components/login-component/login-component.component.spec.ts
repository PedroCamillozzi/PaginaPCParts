import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponentComponent } from './login-component.component';
import { LogueoService } from 'src/app/services/logueo.service';

class LogueoServiceMock{
  tokenExpirado(){
    return
  }
}


describe('LoginComponentComponent', () => {
  let component: LoginComponentComponent;
  let fixture: ComponentFixture<LoginComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponentComponent],
      providers:[{ provide: LogueoService, useClass: LogueoServiceMock}
      ]
    });
    fixture = TestBed.createComponent(LoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
