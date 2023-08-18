import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent {
  logueado:boolean= false;


  constructor( private routes: Router){

  }

  reciveDataFromChild(logueado:boolean){
    this.logueado = logueado;

  }

  redirectToCarrito(){
    this.routes.navigate(['carrito']);
  }


}
