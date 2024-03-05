import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../interfaces/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { ErrorService } from '../../services/error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{
  loading:boolean=false;
  loginForm:FormGroup;
  emailError:boolean = false;

  @Output() dataToParent: EventEmitter<boolean> = new EventEmitter<boolean>();
  logueado:boolean= false;

  constructor(
              private _clienteService:ClienteService,
              private router:Router,
              private _errorService:ErrorService,
              private formBuilder:FormBuilder){
                this.loginForm = this.formBuilder.group({
                  email: ['', [Validators.required, Validators.email]],
                  password: ['', [Validators.required]]
                });
  }

  ngOnInit(): void {
    
  }

  login(){

    const cliente:Cliente = {
      email: this.loginForm.get('email')?.value,
      contraseña: this.loginForm.get('password')?.value
    }

  



    this.loading = false;
    this._clienteService.login(cliente).subscribe({
      next: (data:any)=>{
        localStorage.setItem('token', data.token);
        localStorage.setItem('idCliente', data.idCliente);
        localStorage.setItem('Tipo de Usuario', data.tipoUsuarioNombre);
        this.router.navigate(['home']);
        this.loading = true;
        this.cerrarModal();
      },
      error: (err:HttpErrorResponse) => {
        this._errorService.msjError(err);
        this.loading = false;
      }
    });
    
  }
  cerrarModal(){
    this.logueado = true;
    this.dataToParent.emit(this.logueado);
    
  }



}
