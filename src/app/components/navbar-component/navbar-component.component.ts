import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/Interceptor/auth.interceptor';
import { Producto } from 'src/app/interfaces/Producto';
import { LogueoService } from 'src/app/services/logueo.service';
import { ProductoService } from 'src/app/services/producto.service';

@Injectable()
@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {
  logueado:boolean= false;
  filtro:String='';
  todosLosProdutos:Producto[]=[];
  productosFiltrados: Producto[] = [];


  constructor( private routes: Router, private _auth: AuthInterceptor, private _logService: LogueoService, private _productoService:ProductoService ){
    
    //console.log("atributo ",this.logueado);
    //console.log("funcion: ",this.authentificarLogueo());
    
    
  }

  async ngOnInit(): Promise<void> {
    await this.getProductosFiltrados();
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

  async getProductosFiltrados(){
    this._productoService.getProductos().subscribe(data => {
      this.todosLosProdutos = data
    });
    
  }

  filtradoProducto(){
    console.log(this.filtro);
    this.productosFiltrados = this.todosLosProdutos.filter((todosLosProdutos) =>
    todosLosProdutos.nombreProducto.toLowerCase().includes(this.filtro.toLowerCase())
  );
  console.log(this.filtro);
  console.log(this.productosFiltrados);
  
  
  }




}
