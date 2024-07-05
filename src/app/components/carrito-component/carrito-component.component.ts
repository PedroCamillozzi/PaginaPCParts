import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carrito } from '../../interfaces/Carrito';
import { DetallePedidos } from '../../interfaces/DetallePedido.js';
import { PrecioProducto } from '../../interfaces/PrecioProductos';
import { Producto } from '../../interfaces/Producto';
import { CarritoService } from '../../services/carrito.service';
import { DetallePedidoService } from '../../services/detallePedido.service';
import { ErrorService } from '../../services/error.service';
import { PedidoService } from '../../services/pedido.service';
import { PrecioProductoService } from '../../services/precioProducto.service';
import { ProductoService } from '../../services/producto.service';
import { JwtService } from 'src/app/services/jwt.service';
import { ImageService } from 'src/app/services/image.service';

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
              private _detallePedidoService:DetallePedidoService,
              private _jwtService:JwtService,
              private _imageService:ImageService){
  }

  ngOnInit(): void{
    this.getCarritoCliente();

    this.verificarIdProducto();
  }
  
  getCarritoCliente() {
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';
    if(idCliente != ''){
      this._carritoService.getProductosCarritoCliente(idCliente).subscribe(data=>{

        this.carritoCliente = data
        this.getProductoCliente();
        this.loadPrincipalProductsImages();
      })
    }
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
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';
    if(idCliente != ''){
      const carritoCliente ={
        idCliente: idCliente,
        idProducto: this.idProducto,
        cantidad: 1
      }
      this._carritoService.patchProductoCarritoCliente(carritoCliente).subscribe({
        next: ()=>{
         this.router.navigate(['carrito/'+ idCliente])
        },
        error: (err:HttpErrorResponse) => {
          this._errorService.msjError(err);
        }
      })
    }
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

        if(cc.idProducto == ppc.idProducto){

          this.total += (cc.cantidad*ppc.precio);
        }
    
  }


  aumentarCantidad(c:Carrito){
      const pc:Producto | undefined = this.productosCliente.find(pc => pc.idProducto === c.idProducto);
      
      if(pc?.idProducto == c.idProducto && pc?.stock > c.cantidad){
        c.cantidad++

        this._carritoService.patchModificarCantidadCarritoCliente(c).subscribe(data =>{
          this._precioProductoService.getPrecioProducto(pc.idProducto).subscribe(dataPrecioProducto =>{
            const precio:number = dataPrecioProducto.precio
            this.total += Number(precio);
            window.location.reload();
          })
        })
        
      }

    
  }

  disminuirCantidad(c:Carrito){
    const pc:Producto | undefined = this.productosCliente.find(pc => pc.idProducto === c.idProducto);
    
      if(pc?.idProducto == c.idProducto && pc?.stock >= c.cantidad && c.cantidad > 1){
        c.cantidad--

        this._carritoService.patchModificarCantidadCarritoCliente(c).subscribe(data =>{
          this._precioProductoService.getPrecioProducto(pc.idProducto).subscribe(dataPrecioProducto =>{
            const precio:number = dataPrecioProducto.precio
            this.total -= Number(precio);
            window.location.reload();
          })
        })
        
      }
      
      }

  eliminarDelCarrito(c:Carrito){
    this._carritoService.removeProductoCarritoCliente(c).subscribe(data => {
    })
    window.location.reload();

  }

  redirectToProducto(idProducto:number){
    this.router.navigate(['producto/'+idProducto])
  }

  registrarPedido(){    
    if(this.productosCliente.length === 0){
      this._toastr.error("Debe cargar productos al carrito", "Error")
      return
    }
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';
    
    
    if(idCliente != ''){
      this._pedidoService.postPedidoCliente(idCliente).subscribe((data)=>{
        const detallePedido:DetallePedidos = {
          idPedido: data.idPedido,
          idProducto: 0,
          cantidad: 0
        }  
      this.carritoCliente?.forEach(cc => {      
          detallePedido.idProducto = cc.idProducto
          detallePedido.cantidad = cc.cantidad
          this._detallePedidoService.postDetallePedido(detallePedido).subscribe(()=>{
            
          })
        })
      });
  
      this._carritoService.removeAllProductosCliente(idCliente).subscribe(()=>{
        
      });
      this.router.navigate(['finalizarPedido']);
    }
   
    
    
  }

  loadPrincipalProductsImages(){
    this._imageService.getPrincipalProductsImage().subscribe({
      next: (data) =>{
          this.productosCliente.forEach(lp => {
            data.forEach((d:any) => {
              if(d.filename.includes(lp.idProducto.toString())){
                lp.imagen = 'data:image/jpeg;base64,' + d.data
              }
            });
          if(lp.imagen == undefined){
            lp.imagen = '../../../assets/images/Procesador_Intel_Celeron_G4900.jpg'
          }          
        });
 
      },
      error: (error:HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }

}
