import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrito } from 'src/app/interfaces/Carrito';
import { PrecioProducto } from 'src/app/interfaces/PrecioProductos';
import { Producto } from 'src/app/interfaces/Producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ErrorService } from 'src/app/services/error.service';
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
              private router:Router){
  }

  async ngOnInit(): Promise<void> {
    await this.getCarritoCliente();
    await this.getProductoCliente();
    await this.getPrecioProductosCliente();

    this.verificarIdProducto();
  }
  
  async getCarritoCliente() {
    const idCliente: string = localStorage.getItem('idCliente') || '';
    try {
      this.carritoCliente = await this._carritoService.getProductosCarritoCliente(idCliente).toPromise();
    } catch (error) {

    }
  }
async getProductoCliente(){
    this.carritoCliente?.forEach(cc => {
    this._productoService.getProducto(cc.idProducto.toString()).subscribe(data=>{
      
      this.productosCliente.push(data);
    });
      
    });
  }
async getPrecioProductosCliente(){
  this.carritoCliente?.forEach(cc => {
    this._precioProductoService.getPrecioProducto(cc.idProducto).subscribe(data=>{
      
      this.precioProductosCliente.push(data);
    });
      
    });
    this.calcularTotal();

    
}

  async agregarProductoAlCarrito(){
    const idCliente:string = localStorage.getItem('idCliente') || ''; 
    const carritoCliente ={
      idCliente: idCliente,
      idProducto: this.idProducto,
      cantidad: 1
    }
    this._carritoService.patchProductoCarritoCliente(carritoCliente).subscribe({
      next: async (data)=>{
          await this.getCarritoCliente();
      },
      error: (err:HttpErrorResponse) => {
        this._errorService.msjError(err);
      }
    })
  }

  async recuperaIdProducto(){
    this._activatedRoute.paramMap.subscribe(params =>{
      const data = params.get('idProducto') || '';
      this.idProducto = data
    })
  }

  async verificarIdProducto(){
    await this.recuperaIdProducto();
    if(this.idProducto !== ''){
      await this.agregarProductoAlCarrito();
    }
  }

  calcularTotal(){
    this.precioProductosCliente.forEach(ppc => {
      console.log(ppc.precio);
      this.carritoCliente?.forEach(cc => {
        if(cc.idProducto === ppc.idProducto){

          console.log(ppc.precio);
          
          
          this.total += cc.cantidad*ppc.precio;
        }
        
      });
    });
    console.log(this.carritoCliente);
    console.log(this.precioProductosCliente);
    
    
    console.log(this.total);
    
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
    this.router.navigate(['finalizarPedido'])
  }

}
