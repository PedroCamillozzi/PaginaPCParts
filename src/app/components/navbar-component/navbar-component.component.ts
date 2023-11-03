import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrecioProducto } from '../../interfaces/PrecioProductos';
import { Producto } from '../../interfaces/Producto';
import { LogueoService } from '../../services/logueo.service';
import { PrecioProductoService } from '../../services/precioProducto.service';
import { ProductoService } from '../../services/producto.service';


@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})

export class NavbarComponentComponent implements OnInit {
  logueado:boolean= false;
  todosLosProdutos:Producto[]=[];
  productosFiltrados: Producto[] = [];
  precioProductosCliente:PrecioProducto[]=[];
  droplistFiltrado:boolean = true;


  constructor( private routes: Router, private _logService: LogueoService, private _productoService:ProductoService, private _precioProductoService: PrecioProductoService ){
    
    //console.log("atributo ",this.logueado);
    //console.log("funcion: ",this.authentificarLogueo());
    
    
  }

  ngOnInit(): void {
    this.getProductosFiltrados();
    
    this.logueado = this.authentificarLogueo();
  }

  reciveDataFromChild(logueado:boolean){
    this.logueado = logueado;

  }

  redirectToCarrito(){
    const idCliente:string = localStorage.getItem('idCliente') || '';
    this.routes.navigate(['carrito/' + idCliente]);
  }

  authentificarLogueo():boolean{
    const token:string = localStorage.getItem('token') || "";
   // console.log("token: ", token);
   // console.log("token expirado", !this._logService.tokenExpirado(token));
   // console.log("token distinto de nulo: ", token !== null);
    
    
    if(token !== null && token !== "" /*&& !this._logService.tokenExpirado(token)*/){
      //console.log("entro en true");
      
      return true
    }
   // console.log("entro en false");
    return false;

  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('idCliente');
  }

  redirectToDatosPersonales(){
    const idCliente:string = localStorage.getItem('idCliente') || '';
    this.routes.navigate(['misdatos/'+ idCliente])
  }

  redirectToPedidosCliente(){
    const idCliente:string = localStorage.getItem('idCliente') || '';
    this.routes.navigate(['misPedidos/'+ idCliente])
  }

  getProductosFiltrados(){
    this._productoService.getProductos().subscribe(data => {
      this.todosLosProdutos = data
      
      this.getPrecioProductosCliente();
    });
    
  }



  filtradoProducto(filtro:string){
    this.droplistFiltrado = false;
    this.productosFiltrados = this.todosLosProdutos.filter((todosLosProdutos) =>
    todosLosProdutos.nombreProducto.toLowerCase().includes(filtro.toLowerCase())
  ); 
  
  }
  cerrarDroplistFiltrado(){
    setTimeout(() => {
      this.droplistFiltrado = true;
    }, 100);
  }


  getPrecioProductosCliente(){
    this.todosLosProdutos?.forEach(tp => {
      this._precioProductoService.getPrecioProducto(tp.idProducto).subscribe(data=>{
        
        this.precioProductosCliente.push(data);
        
      });
        
      });
  
      
  }

  redirectToProducto(idProducto:number){
    this.routes.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.routes.navigate(['producto/'+idProducto]);
    });
  }




}
