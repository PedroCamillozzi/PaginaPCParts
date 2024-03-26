import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProductosCompletos } from 'src/app/interfaces/IProductosCompletos';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-administrar-pedidos-component',
  templateUrl: './administrar-pedidos-component.component.html',
  styleUrls: ['./administrar-pedidos-component.component.css']
})
export class AdministrarPedidosComponentComponent implements OnInit {
  droplistFiltrado:boolean = true;
  productosFiltrados: IProductosCompletos[] = [];
  todosLosPedidos:IProductosCompletos[]=[];

  constructor(private routes:Router,
              private _pedidosService:PedidoService) { }

  ngOnInit() {
    this.getAllPedidos();
    console.log(this.todosLosPedidos);
    
  }

  getAllPedidos(){
    this._pedidosService.findAllPedidos().subscribe( (data) =>{
      this.todosLosPedidos = data
      console.log(data);
      
    });
  }


  redirectToProducto(idProducto:number){
    this.routes.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.routes.navigate(['producto/'+idProducto]);
    });
  }

  filtradoProducto(filtro:string){
    console.log(this.todosLosPedidos);
    
    this.droplistFiltrado = false;
    this.productosFiltrados = this.todosLosPedidos.filter((todosLosPedidos) =>
    todosLosPedidos.idPedido); 
  }

  cerrarDroplistFiltrado(){
    setTimeout(() => {
      this.droplistFiltrado = true;
    }, 100);
  }
  

}
