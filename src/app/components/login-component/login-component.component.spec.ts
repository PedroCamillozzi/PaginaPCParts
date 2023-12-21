import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponentComponent } from './login-component.component';
import { LogueoService } from '../../services/logueo.service';
import { ClienteService } from '../../services/cliente.service';

class LogueoServiceMock{
  tokenExpirado(){
    return
  }
}

class ClienteServiceMock{
  signIn(){
    return;
  }
  login(){
    return;
  }
  getDatosCliente(){
    return;
  }
  patchcambiarDatosCliente(){
    return;
  }
  patchcambiarContraseñaCliente(){
    return;
  }
}


describe('LoginComponentComponent', () => {
  let component: LoginComponentComponent;
  let fixture: ComponentFixture<LoginComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponentComponent],
      providers:[{ provide: LogueoService, useClass: LogueoServiceMock},
                 { provide: ClienteService , useClass:ClienteServiceMock}
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
