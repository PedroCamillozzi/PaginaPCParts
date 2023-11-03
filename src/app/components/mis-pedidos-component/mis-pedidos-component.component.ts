import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePedidos } from '../../interfaces/DetallePedido';
import { Pedido } from '../../interfaces/Pedido';
import { PrecioProducto } from '../../interfaces/PrecioProductos';
import { Producto } from '../../interfaces/Producto';
import { DetallePedidoService } from '../../services/detallePedido.service';
import { PedidoService } from '../../services/pedido.service';
import { PrecioProductoService } from '../../services/precioProducto.service';
import { ProductoService } from '../../services/producto.service';
//import { MisPedidos } from 'src/app/interfaces/MisPedidos';

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
  //interfazPedidos:MisPedidos[]=[];

  constructor( private _pedidoService: PedidoService,
                private _productoService: ProductoService,
                private _detallePedidoService: DetallePedidoService,
                private router:Router,
                private _precioProductoService:PrecioProductoService,
                ){
                
  }

  ngOnInit(): void {
  
  this.findAllPedidosCliente();
  
  
  
    
  }
  

  findAllPedidosCliente(){
    const idCliente:string = localStorage.getItem('idCliente') || '';
      this._pedidoService.findAllPedidosCliente(idCliente).subscribe((data) =>{
        this.pedidosRealizadosCliente = data;
        this.getDetallePedidos();
        
      });
      
  }

  getDetallePedidos(){
    this.pedidosRealizadosCliente?.forEach((prc) => {
     this._detallePedidoService.findAllDetallePedidoCliente(prc.idPedido.toString()).subscribe((data:DetallePedidos[]|any) =>{
      this.detalleProductosCliente.push(data[0])
      this.getProductoCliente(data[0].idProducto.toString());
     })
     
    });
    
    
  }

  getProductoCliente(idProducto:string){
    
    this._productoService.getProducto(idProducto).subscribe(data=>{
      this.productosCliente.push(data)
      this.getPrecioProductosCliente(data.idProducto);
      //this.cargarInterfaz()
    })
    
  }

  getPrecioProductosCliente(idProducto:number){ //Cambiar cuando se haga que el historial de precio
      this._precioProductoService.getPrecioProducto(idProducto).subscribe((data:any)=>{
        
        this.precioProductosCliente.push(data);
        
      });
      
      
  }

  redirectToProducto(idProducto:number){
    this.router.navigate(['producto/'+idProducto])
  }

  /*cargarInterfaz(){
    const date = new Date('2023-08-17 01:24:21')
   this.detalleProductosCliente?.forEach(dpcli => {
    const parte:MisPedidos[] = [{
      idPedido: dpcli.idPedido,
      idProducto: dpcli.idProducto,
      cantidad: dpcli.cantidad,
      fechaPedido: date,
    }]

    this.interfazPedidos.push(parte[0])
   });

   this.pedidosRealizadosCliente?.forEach(prcli =>{
    this.interfazPedidos.forEach(ip => {
      if(prcli.idPedido == ip.idPedido){
        ip.fechaPedido = prcli.fechaPedido
        ip.fechaEntrega = prcli.fechaEntrega
        ip.estado = prcli.estado
        ip.idCliente = prcli.idCliente
      }
    });
   });


   this.precioProductosCliente.forEach(ppcli =>{
    this.interfazPedidos.forEach(ip => {
      if(ppcli.idProducto == ip.idProducto && ip.fechaPedido < ppcli.fechaDesde){
        ip.precio = ppcli.precio
      }
    });
   });

   let i=0;
   this.interfazPedidos.forEach(iped => {
    let count = 0;
    i++
    this.interfazPedidos.forEach(iped2 => {

     if(iped.idPedido == iped2.idPedido){
      count++
     if(count >= 2 ){
      this.interfazPedidos.slice(i)
     }
     }
    });
   });

   console.log(this.interfazPedidos);
   
   

    
  }*/

  


}
