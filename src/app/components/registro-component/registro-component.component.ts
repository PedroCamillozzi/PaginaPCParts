import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../interfaces/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { ErrorService } from '../../services/error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-component',
  templateUrl: './registro-component.component.html',
  styleUrls: ['./registro-component.component.css']
})
export class RegistroComponentComponent {
  loading:boolean= false;
  nameError:boolean = false;
  lastNameError:boolean = false;
  dniError:boolean = false;
  phoneError:boolean = false;
  emailError:boolean = false;
  passwordError:boolean = false;
  repeatPassworError:boolean = false;
  formularioRegistro: FormGroup;

  constructor(private toastr:ToastrService,
              private _clienteService:ClienteService,
              private _errorService:ErrorService,
              private formBuilder:FormBuilder){
                this.formularioRegistro = this.formBuilder.group({
                  name: ['', [Validators.required, Validators.maxLength(50)]],
                  lastName: ['', [Validators.required, Validators.maxLength(50)]],
                  dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]{1,8}$')]],
                  phone: ['', [Validators.required, , Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]{1,10}$')]],
                  email: ['', [Validators.required, Validators.email]],
                  password: ['', [Validators.required, Validators.minLength(6)]],
                  repeatPassword: ['', [Validators.required]]
                });
  }





  registrar(){

    const cliente:Cliente ={
      nombre: this.formularioRegistro.get('name')?.value,
      apellido: this.formularioRegistro.get('lastName')?.value,
      dni:this.formularioRegistro.get('dni')?.value,
      email: this.formularioRegistro.get('email')?.value,
      telefono: this.formularioRegistro.get('phone')?.value,
      contraseña: this.formularioRegistro.get('password')?.value
    }

    this.loading = true;
    this._clienteService.signIn(cliente).subscribe({
      next:(v) => {
        this.loading = false;
        this.toastr.success('Usted ha sido registrado con éxito', 'Hola ' + this.formularioRegistro.get('name')!.value)
      },
      error:(event:HttpErrorResponse)=>{
        this._errorService.msjError(event);
        this.loading = false;
      }
    });
  }

  validaciones(){
  
  }

  nameValidate(){
    const nameValue = this.formularioRegistro.get('name')?.value;
    if (nameValue && nameValue.length > 50) {
      this.nameError = true;
      return false;
    }
    this.nameError = false;
    return true;
  }

 lastNameValidate(){
  const lastNameValue = this.formularioRegistro.get('lastName')?.value;
    if(lastNameValue && lastNameValue.length > 50){
      this.lastNameError = true;
      return false;
    }
    this.lastNameError = false;
    return true
  }

  dniValidate(){
    const dniValue = this.formularioRegistro.get('dni')?.value;
    if(dniValue && dniValue.length > 7){
      this.dniError = true;
      return false;
    }
    this.dniError = false;
    return true
  }

  phoneValidate(){
    const phoneValue = this.formularioRegistro.get('phone')?.value;
    if(phoneValue && phoneValue.length > 9){
      this.phoneError = true;
      return false;
    }
    this.phoneError = false;
    return true
  }

  emailValidate(){
    const emailValue = this.formularioRegistro.get('email')?.value;
    if(!emailValue){
      this.emailError = true;
      return false;
    }
    this.emailError = false;
    return true
  }

  passwordValidate(){
    const passwordValue = this.formularioRegistro.get('password')?.value;
    if(passwordValue && passwordValue.length < 6){
      this.passwordError = true;
      return false;
    }
    this.passwordError = false;
    return true
  }

  repeatPasswordValidate(){
    const passwordValue = this.formularioRegistro.get('password')?.value;
    const repeatPasswordValue = this.formularioRegistro.get('repeatPassword')?.value;
    if(repeatPasswordValue && passwordValue !== repeatPasswordValue){
      this.repeatPassworError = true;
      return false;
    }
    this.repeatPassworError = false;
    return true
  }



  

}
