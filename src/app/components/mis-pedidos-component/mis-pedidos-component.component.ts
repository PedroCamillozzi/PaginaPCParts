import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { IProductosCompletos } from 'src/app/interfaces/IProductosCompletos';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-mis-pedidos-component',
  templateUrl: './mis-pedidos-component.component.html',
  styleUrls: ['./mis-pedidos-component.component.css']
})
export class MisPedidosComponentComponent implements OnInit {
  pedidosRealizadosCliente:IProductosCompletos[] | undefined=[];

  constructor( private _pedidoService: PedidoService,
                private router:Router,
                private _jwtService: JwtService
                ){
                
  }

  ngOnInit(): void {
  
  this.findAllPedidosCliente();
  
  
  
    
  }
  

  findAllPedidosCliente(){
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';
      this._pedidoService.findAllPedidosCliente(idCliente).subscribe((data) =>{
        this.pedidosRealizadosCliente = data;
      });
      
  }

  returnOnlyDate(fechaPedido:Date):string{
    const fecha = fechaPedido;
    return new Date(fecha).toLocaleDateString();
  }

  redirectToProducto(idProducto:number){
    this.router.navigate(['producto/'+idProducto])
  }

  


}
