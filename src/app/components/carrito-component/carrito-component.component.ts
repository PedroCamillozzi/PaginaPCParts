import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carrito } from 'src/app/interfaces/Carrito';
import { DetallePedidos } from 'src/app/interfaces/DetallePedido.js';
import { Pedido } from 'src/app/interfaces/Pedido.js';
import { PrecioProducto } from 'src/app/interfaces/PrecioProductos';
import { Producto } from 'src/app/interfaces/Producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { DetallePedidoService } from 'src/app/services/detallePedido.service';
import { ErrorService } from 'src/app/services/error.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { PrecioProductoService } from 'src/app/services/precioProducto.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-carrito-component',
  templateUrl: './carrito-component.component.html',
  styleUrls: ['./carrito-component.component.css']
})
export class CarritoComponentComponent implements OnInit {
  carritoCliente:Carrito[] | undefined=[];
  productosCliente:Producto[]=[];
  precioProductosCliente:PrecioProducto[]=[];
  idProducto:string='';
  total:number=0;


  constructor(private _carritoService:CarritoService,
              private _activatedRoute:ActivatedRoute,
              private _errorService:ErrorService,
              private _productoService:ProductoService,
              private _precioProductoService:PrecioProductoService,
              private _toastr:ToastrService,
              private router:Router,
              private _pedidoService:PedidoService,
              private _detallePedidoService:DetallePedidoService){
  }

  ngOnInit(): void{
    this.getCarritoCliente();

    this.verificarIdProducto();
  }
  
  getCarritoCliente() {
    const idCliente: string = localStorage.getItem('idCliente') || '';
    this._carritoService.getProductosCarritoCliente(idCliente).subscribe(data=>{
      this.carritoCliente = data
      
    })
    this.getProductoCliente();
  }
getProductoCliente(){
    this.carritoCliente?.forEach(cc => {
    this._productoService.getProducto(cc.idProducto.toString()).subscribe(data=>{
      
      this.productosCliente.push(data);
    });
      
    });
    this.getPrecioProductosCliente();
  }
getPrecioProductosCliente(){
  this.carritoCliente?.forEach(cc => {
    this._precioProductoService.getPrecioProducto(cc.idProducto).subscribe((data)=>{
      this.precioProductosCliente.push(data);

      this.calcularTotal(cc, data);
    });
      
    });
    

    
}

  agregarProductoAlCarrito(){
    const idCliente:string = localStorage.getItem('idCliente') || ''; 
    const carritoCliente ={
      idCliente: idCliente,
      idProducto: this.idProducto,
      cantidad: 1
    }
    this._carritoService.patchProductoCarritoCliente(carritoCliente).subscribe({
      next: (data)=>{
           this.getCarritoCliente();
      },
      error: (err:HttpErrorResponse) => {
        this._errorService.msjError(err);
      }
    })
  }

  recuperaIdProducto(){
    this._activatedRoute.paramMap.subscribe(params =>{
      const data = params.get('idProducto') || '';
      this.idProducto = data
    })
  }

  verificarIdProducto(){
    this.recuperaIdProducto();
    if(this.idProducto !== ''){
    this.agregarProductoAlCarrito();
    }
  }

  calcularTotal(cc:Carrito, ppc:PrecioProducto){

        if(cc.idProducto === ppc.idProducto){

          
          
          this.total += cc.cantidad*ppc.precio;
        }
      
    console.log("Carrito CLiente: ", this.carritoCliente);
    console.log("Precio Producos cliente: ", this.precioProductosCliente);
    console.log("productosCliente: ",this.productosCliente );
    
    
    
    console.log("Total: ",this.total);
    
  }


  aumentarCantidad(c:Carrito){
      const pc:Producto | undefined = this.productosCliente.find(pc => pc.idProducto === c.idProducto);
      
      if(pc?.idProducto == c.idProducto && pc?.stock > c.cantidad){
        c.cantidad++

        this._carritoService.patchModificarCantidadCarritoCliente(c).subscribe(data =>{
          console.log(data);
          
        })
     
      }

    
  }

  disminuirCantidad(c:Carrito){
    const pc:Producto | undefined = this.productosCliente.find(pc => pc.idProducto === c.idProducto);
    
      if(pc?.idProducto == c.idProducto && pc?.stock >= c.cantidad && c.cantidad > 1){
        c.cantidad--

        this._carritoService.patchModificarCantidadCarritoCliente(c).subscribe(data =>{
          console.log(data);
          
        })
        
      }
      
      }

  eliminarDelCarrito(c:Carrito){
    this._carritoService.removeProductoCarritoCliente(c).subscribe(data => {
      console.log(data);
      
    })

  }

  redirectToProducto(idProducto:number){
    this.router.navigate(['producto/'+idProducto])
  }

  registrarPedido(){
    if(!this.productosCliente){
      this._toastr.error("Debe cargar productos al carrito", "Error")
      return
    }
    const idCliente = localStorage.getItem('idCliente') || '';
    
    
    this.carritoCliente?.forEach(cc => {
      this._pedidoService.postPedidoCliente(idCliente).subscribe((data)=>{
        const detallePedido:DetallePedidos = {
          idPedido: data.idPedido,
          idProducto: cc.idProducto,
          cantidad: cc.cantidad
        }        
        
        this._detallePedidoService.postDetallePedido(detallePedido).subscribe(()=>{
          
        })
      })
    });

    this._carritoService.removeAllProductosCliente(idCliente);
    this.router.navigate(['finalizarPedido']);
    
    
  }

}
