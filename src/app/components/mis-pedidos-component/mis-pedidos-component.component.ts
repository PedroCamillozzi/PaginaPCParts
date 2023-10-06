import { HttpErrorResponse } from '@angular/common/http';
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
  total:number=0;

  constructor( private _pedidoService: PedidoService,
                private _productoService: ProductoService,
                private _detallePedidoService: DetallePedidoService,
                private router:Router,
                private _precioProductoService:PrecioProductoService,
                private _errorService:ErrorService){

  }

  async ngOnInit(): Promise<void> {
    await this.findAllPedidosCliente();
    await this.getDetallePedidos();
    await this.getProductoCliente();
    console.log(this.productosCliente);
    
    await this.getPrecioProductosCliente();
    
  }
  

  async findAllPedidosCliente(){
    const idCliente:string = localStorage.getItem('idCliente') || '';
    try{
      this.pedidosRealizadosCliente = await this._pedidoService.findAllPedidosCliente(idCliente).toPromise();
    }
    catch(error){

    }
   
  }

  async getDetallePedidos(){
    this.pedidosRealizadosCliente?.forEach(async (prc) => {
     this._detallePedidoService.findAllDetallePedidoCliente(prc.idPedido.toString()).subscribe((data:DetallePedidos[]|any) =>{
      this.detalleProductosCliente.push(data[0])
     })
  
      
    });
  }

  async getProductoCliente(){
    console.log("Detalle: ", this.detalleProductosCliente);

    for (const prc of this.detalleProductosCliente){
      console.log("id: ", prc.idProducto);
      
    }
    
    
    this.detalleProductosCliente?.forEach(async dpc => {  
      console.log("dpc", dpc.idProducto);
        
      const data:any = await this._productoService.getProducto(dpc.idProducto.toString()).toPromise();
      this.productosCliente.push(data);})

  }

  async getPrecioProductosCliente(){
    this.detalleProductosCliente?.forEach(cc => {
      this._precioProductoService.getPrecioProducto(cc.idProducto).subscribe(data=>{
        
        this.precioProductosCliente.push(data);
      });
        
      });
      this.calcularTotal();
  
      
  }

  calcularTotal(){
    this.precioProductosCliente.forEach(ppc => {
      console.log(ppc.precio);
      this.detalleProductosCliente?.forEach(cc => {
        if(cc.idProducto === ppc.idProducto){

          console.log(ppc.precio);
          
          
          this.total += cc.cantidad*ppc.precio;
        }
        
      });
    });
    console.log(this.precioProductosCliente);
    
    
    
  }

  redirectToProducto(idProducto:number){
    this.router.navigate(['producto/'+idProducto])
  }


}
