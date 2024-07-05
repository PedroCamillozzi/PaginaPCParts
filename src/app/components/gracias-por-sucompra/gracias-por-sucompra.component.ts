import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-gracias-por-sucompra',
  templateUrl: './gracias-por-sucompra.component.html',
  styleUrls: ['./gracias-por-sucompra.component.css']
})
export class GraciasPorSucompraComponent {

  
  constructor(private router:Router,
              private _jwtService:JwtService
  ){
    this.redirectToMisPedidos();
  }

  redirectToMisPedidos(){
    setTimeout(() => {
      const token = localStorage.getItem('token') || '';
      const idCliente: string = this._jwtService.getClientId(token) || '';
      this.router.navigate(['misPedidos/'+ idCliente])
    }, 1700);
  }
}
