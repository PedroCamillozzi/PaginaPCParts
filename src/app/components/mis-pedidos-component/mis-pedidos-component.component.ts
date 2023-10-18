import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePedidos } from 'src/app/interfaces/DetallePedido';
import { Pedido } from 'src/app/interfaces/Pedido';
import { PrecioProducto } from 'src/app/interfaces/PrecioProductos';
import { Producto } from 'src/app/interfaces/Producto';
import { DetallePedidoService } from 'src/app/services/detallePedido.service';
import { ErrorService } from 'src/app/services/error.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { PrecioProductoService } from 'src/app/services/precioProducto.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-mis-pedidos-component',
  templateUrl: './mis-pedidos-component.component.html',
  styleUrls: ['./mis-pedidos-component.component.css']
})
export class MisPedidosComponentComponent implements OnInit {
  pedidosRealizadosCliente:Pedido[] | undefined=[];
  detalleProductosCliente:DetallePedidos[]=[];
  productosCliente:Producto[]=[];
  precioProductosCliente:PrecioProducto[]=[];

  constructor( private _pedidoService: PedidoService,
                private _productoService: ProductoService,
                private _detallePedidoService: DetallePedidoService,
                private router:Router,
                private _precioProductoService:PrecioProductoService,
                private _errorService:ErrorService){

  }

  ngOnInit(): void {
    this.findAllPedidosCliente();
    
    this.getPrecioProductosCliente();
    
  }
  

  findAllPedidosCliente(){
    const idCliente:string = localStorage.getItem('idCliente') || '';
      this._pedidoService.findAllPedidosCliente(idCliente).subscribe((data) =>{
        this.pedidosRealizadosCliente = data
        console.log("data: ", data);
        
        console.log("Pedidos cliente ", this.pedidosRealizadosCliente);
        
        this.getDetallePedidos();
      })
      
  }

  getDetallePedidos(){
    this.pedidosRealizadosCliente?.forEach((prc) => {
     this._detallePedidoService.findAllDetallePedidoCliente(prc.idPedido.toString()).subscribe((data:DetallePedidos[]|any) =>{
      this.detalleProductosCliente.push(data[0])

      this.getProductoCliente();
     })
     
      
    });
  }

  getProductoCliente(){
    console.log("Detalle: ", this.detalleProductosCliente);

    for (const prc of this.detalleProductosCliente){
      console.log("id: ", prc.idProducto);
      
    }
    
    
    this.detalleProductosCliente?.forEach(dpc => {  
      console.log("dpc", dpc.idProducto);
      
      this._productoService.getProducto(dpc.idProducto.toString()).subscribe(data=>{
        this.productosCliente.push(data)
      })
    })

  }

  getPrecioProductosCliente(){
    this.detalleProductosCliente?.forEach(cc => {
      this._precioProductoService.getPrecioProducto(cc.idProducto).subscribe(data=>{
        
        this.precioProductosCliente.push(data);
      });
        
      });
  
      
  }

  redirectToProducto(idProducto:number){
    this.router.navigate(['producto/'+idProducto])
  }


}
