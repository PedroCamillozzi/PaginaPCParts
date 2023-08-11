import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/interfaces/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{
  email:string='';
  password:string='';
  loading:boolean=false
  

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




    this.loading = true
    this._clienteService.login(cliente).subscribe({
      next: (token)=>{
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
      },
      error: (err:HttpErrorResponse) => {
        this._errorService.msjError(err);
        this.loading = false;
      }
    });
    
  }



}
