import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gracias-por-sucompra',
  templateUrl: './gracias-por-sucompra.component.html',
  styleUrls: ['./gracias-por-sucompra.component.css']
})
export class GraciasPorSucompraComponent {

  
  constructor(private router:Router){
    this.redirectToMisPedidos();
  }

  redirectToMisPedidos(){
    setTimeout(() => {
      const idCliente = localStorage.getItem('idCliente');
      this.router.navigate(['misPedidos/'+ idCliente])
    }, 1700);
  }
}
