import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrecioProducto } from '../../interfaces/PrecioProductos';
import { Producto } from '../../interfaces/Producto';
import { LogueoService } from '../../services/logueo.service';
import { PrecioProductoService } from '../../services/precioProducto.service';
import { ProductoService } from '../../services/producto.service';
import { ClienteService } from '../../services/cliente.service';
import { JwtService } from 'src/app/services/jwt.service';
import { ImageService } from 'src/app/services/image.service';
import { HttpErrorResponse } from '@angular/common/http';


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
  image:any = '../../../assets/images/usuarioPerfil.png'


  constructor( private routes: Router,
               private _logService: LogueoService,
               private _productoService:ProductoService,
               private _precioProductoService: PrecioProductoService,
               private _clienteService:ClienteService,
               private _jwtService: JwtService,
               private _imageService: ImageService ){
    
    //console.log("atributo ",this.logueado);
    //console.log("funcion: ",this.authentificarLogueo());
    
    
  }

  ngOnInit(): void {
    this.loadPerfilImage();
    this.getProductosFiltrados();
    
    this.logueado = this.authentificarLogueo();
  }

  reciveDataFromChild(logueado:boolean){
    this.logueado = logueado;

  }

  redirectToCarrito(){
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';
    this.routes.navigate(['carrito/' + idCliente]);
  }

  authentificarLogueo():boolean{
    const token:string = localStorage.getItem('token') || "";

    if(this._logService.tokenExpirado(token)){
      return false;
    }
    return true;

  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('Tipo de Usuario');
  }

  redirectToDatosPersonales(){
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';
    this.routes.navigate(['misdatos/'+ idCliente])
  }

  redirectToPedidosCliente(){
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';
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

  esAdmin(){
    const rta = this._clienteService.tipoUsuario();

    if(rta === 1){
      return true;
    }
    else {
      return false;
    }
  }

  redirectToAdministrarPedidos(){
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';

    this.routes.navigate(['administrarPedidos/'+idCliente]);
  }

  redirectToAgregarProducto(){
    this.routes.navigate(['agregarProducto']);
  }

  loadPerfilImage(){
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';
    this._imageService.getPerfilImage(idCliente).subscribe({
      next:(data:any) =>{
        this.image = 'data:image/jpeg;base64,' + data[0].data
      },
      error: (error:HttpErrorResponse) =>{
        console.log(error);
      }
    })
  }




}
