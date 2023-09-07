import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/Interceptor/auth.interceptor';
import { LogueoService } from 'src/app/services/logueo.service';

@Injectable()
@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {
  logueado:boolean= false;


  constructor( private routes: Router, private _auth: AuthInterceptor, private _logService: LogueoService ){
    
    //console.log("atributo ",this.logueado);
    //console.log("funcion: ",this.authentificarLogueo());
    
    
  }

  ngOnInit(): void {
    this.logueado = this.authentificarLogueo();
  }

  reciveDataFromChild(logueado:boolean){
    this.logueado = logueado;

  }

  redirectToCarrito(){
    const idCliente:string = localStorage.getItem('idCliente') || '';
    this.routes.navigate(['carrito/' + idCliente]);
  }

  authentificarLogueo():boolean{
    const token:string = localStorage.getItem('token') || "";
   // console.log("token: ", token);
   // console.log("token expirado", !this._logService.tokenExpirado(token));
   // console.log("token distinto de nulo: ", token !== null);
    
    
    if(token !== null && token !== "" /*&& !this._logService.tokenExpirado(token)*/){
      //console.log("entro en true");
      
      return true
    }
   // console.log("entro en false");
    return false;

  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('idCliente');
  }




}
