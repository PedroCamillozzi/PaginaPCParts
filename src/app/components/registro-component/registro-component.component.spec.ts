import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponentComponent } from './registro-component.component';
import { ClienteService } from '../../services/cliente.service';
import { ErrorService } from '../../services/error.service';
import { ToastrService } from 'ngx-toastr';

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

class ErrorServiceMock{
  msjError(){
    return;
  }
}

class ToastrServiceMock{

}

describe('RegistroComponentComponent', () => {
  let component: RegistroComponentComponent;
  let fixture: ComponentFixture<RegistroComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroComponentComponent],
      providers: [{provide: ClienteService, useClass: ClienteServiceMock},
                  {provide: ErrorService, useClass: ErrorServiceMock},
                  {provide: ToastrService, useClass: ToastrServiceMock}]
    });
    fixture = TestBed.createComponent(RegistroComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
