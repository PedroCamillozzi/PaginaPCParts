import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponentComponent } from './registro-component.component';
import { ClienteService } from '../../services/cliente.service';
import { ErrorService } from '../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

class ClienteServiceMock{
signIn(cliente:any):Observable<any>{
  return of(cliente)
}
}

class ErrorServiceMock{
  msjError(){
    return;
  }
}

class ToastrServiceMock{
  success(){
    return of('Usted ha sido registrado con éxito', 'Hola Juan')
  }
}

describe('RegistroComponentComponent', () => {
  let component: RegistroComponentComponent;
  let fixture: ComponentFixture<RegistroComponentComponent>;
  let clienteServiceMock: ClienteService;
  let toastrMock:ToastrService;

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

    clienteServiceMock = TestBed.inject(ClienteService); 
    toastrMock = TestBed.inject(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should registry a client', () => {
    const clientMock = {nombre:'Juan', apellido:'Perez', dni:'12345678', email:'jp@gmail.com', telefono:'1234489875', contraseña:'juan1234'};

    expect(component.loading).toBe(false);

    component.registrar();

    const spyClienteService = jest.spyOn(clienteServiceMock, 'signIn');
    const toastrSuccessSpy = jest.spyOn(toastrMock, 'success');

    expect(spyClienteService).toHaveBeenCalledWith(clientMock);
    expect(toastrSuccessSpy).toHaveBeenCalledWith('Usted ha sido registrado con éxito', 'Hola ' + clientMock.nombre);
    expect(component.loading).toBe(false);
    

  });*/

  it('should nameValidate return true', () => {
    component.formularioRegistro.patchValue({name:'Pedro'});
    expect(component.nameError).toBe(false);

    const result = component.nameValidate();
    expect(component.nameError).toBe(false);
    expect(result).toBe(true);
  });

  it('should nameValidate return false', () => {
    component.formularioRegistro.patchValue({name:'sda6d5as46d54as65d4as6d4as65d4a6s5d46as54d6a5s4d6as54d65as4d6a5s4da6s54da6s54das6d4as65d4as65d4as65d4as654das654d6as54das65d4sa65d4as6'});
    expect(component.nameError).toBe(false);

    const result = component.nameValidate();
    expect(component.nameError).toBe(true);
    expect(result).toBe(false);
  });

  it('should return true from the lastNameValidate', () => {
    component.formularioRegistro.patchValue({lastName:'Perez'});
    expect(component.lastNameError).toBe(false);

    const result = component.lastNameValidate();
    expect(component.lastNameError).toBe(false);
    expect(result).toBe(true);
  });

  it('should return false from the lastNameValidate', () => {
    component.formularioRegistro.patchValue({lastName:'sda6d5as46d54as65d4as6d4as65d4a6s5d46as54d6a5s4d6as54d65as4d6a5s4da6s54da6s54das6d4as65d4as65d4as65d4as654das654d6as54das65d4sa65d4as6'});
    expect(component.lastNameError).toBe(false);

    const result = component.lastNameValidate();
    expect(component.lastNameError).toBe(true);
    expect(result).toBe(false);
  });

  it('should return true from the dniValidate', () => {
    component.formularioRegistro.patchValue({dni:'1234567'});
    expect(component.dniError).toBe(false);

    const result = component.dniValidate();
    expect(component.dniError).toBe(false);
    expect(result).toBe(true);
  });

  it('should return false from the dniValidate', () => {
    component.formularioRegistro.patchValue({dni:'123456789'});
    expect(component.dniError).toBe(false);

    const result = component.dniValidate();
    expect(component.dniError).toBe(true);
    expect(result).toBe(false);
  });

  it('should return true from the phoneValidate', () => {
    component.formularioRegistro.patchValue({phone:'123456789'});
    expect(component.phoneError).toBe(false);

    const result = component.phoneValidate();
    expect(component.phoneError).toBe(false);
    expect(result).toBe(true);
  });

  it('should return false from the phoneValidate', () => {
    component.formularioRegistro.patchValue({phone:'1234567890'});
    expect(component.phoneError).toBe(false);

    const result = component.phoneValidate();
    expect(component.phoneError).toBe(true);
    expect(result).toBe(false);
  });

  it('should return true from the emailValidate', () => {
    component.formularioRegistro.patchValue({email:'jp@gmail.com'});
    expect(component.emailError).toBe(false);

    const result = component.emailValidate();
    expect(component.emailError).toBe(false);
    expect(result).toBe(true);
  });

  it('should return false from the emailValidate', () => {
    component.formularioRegistro.patchValue({email:null});
    expect(component.emailError).toBe(false);

    const result = component.emailValidate();
    expect(component.emailError).toBe(true);
    expect(result).toBe(false);
  });

  it('should return true from the passwordValidate', () => {
    component.formularioRegistro.patchValue({password:'1234567'});
    expect(component.passwordError).toBe(false);

    const result = component.passwordValidate();
    expect(component.passwordError).toBe(false);
    expect(result).toBe(true);
  });

  it('should return false from the passwordValidate', () => {
    component.formularioRegistro.patchValue({password:'1234'});
    expect(component.passwordError).toBe(false);

    const result = component.passwordValidate();
    expect(component.passwordError).toBe(true);
    expect(result).toBe(false);
  });

  it('should return true from the repeatPasswordValidate', () => {
    component.formularioRegistro.patchValue({password:'1234567', repeatPassword:'1234567'});
    expect(component.repeatPassworError).toBe(false);

    const result = component.repeatPasswordValidate();
    expect(component.repeatPassworError).toBe(false);
    expect(result).toBe(true);
  });

  it('should return false from the repeatPasswordValidate', () => {
    component.formularioRegistro.patchValue({password:'1234', repeatPassword:'1234567'});
    expect(component.repeatPassworError).toBe(false);

    const result = component.repeatPasswordValidate();
    expect(component.repeatPassworError).toBe(true);
    expect(result).toBe(false);
  });
});
