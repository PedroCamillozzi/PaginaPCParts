import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../interfaces/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{
  email:string='';
  password:string='';
  loading:boolean=false;

  @Output() dataToParent: EventEmitter<boolean> = new EventEmitter<boolean>();
  logueado:boolean= false;

  constructor(private toastr:ToastrService,
              private _clienteService:ClienteService,
              private router:Router,
              private _errorService:ErrorService){

  }

  ngOnInit(): void {
    
  }

  login(){

    if(this.email == '' || this.password == ''){
      this.toastr.error('Todos los campos son obligatorios', 'Error')
      return
    }

    const cliente:Cliente = {
      email: this.email,
      contraseña: this.password
    }

  



    this.loading = false;
    this._clienteService.login(cliente).subscribe({
      next: (data:any)=>{
        localStorage.setItem('token', data.token);
        localStorage.setItem('idCliente', data.idCliente);
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
