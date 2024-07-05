import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../../interfaces/Producto';
import { ProductoService } from '../../services/producto.service';
import { PrecioProducto } from '../../interfaces/PrecioProductos';
import { PrecioProductoService } from '../../services/precioProducto.service';
import { JwtService } from 'src/app/services/jwt.service';
import { ImageService } from 'src/app/services/image.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-producto-component',
  templateUrl: './producto-component.component.html',
  styleUrls: ['./producto-component.component.css']
})
export class ProductoComponentComponent implements OnInit {
  idProducto:string='';
  producto:Producto={} as Producto;
  precioProducto:PrecioProducto | undefined;
  images:any = []

  constructor(private _productoService:ProductoService,
              private _activatedRoute:ActivatedRoute,
              private _precioProductoService:PrecioProductoService,
              private router:Router,
              private toastr:ToastrService,
              private _jwtService:JwtService,
              private _imageService:ImageService){
  
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params =>{
      const data = params.get('id') || '';
      this.idProducto = data;
    })

    this.loadProductsImages();
    this.getProducto()
  }

  getProducto(){
    this._productoService.getProducto(this.idProducto).subscribe(data=>{
      this.producto = data
      this.getPrecio(data.idProducto)
    })
  }

  getPrecio(idProducto:number){
    this._precioProductoService.getPrecioProducto(idProducto).subscribe(data =>{
      this.precioProducto = data;
    })
  }

  loginVerify(){
    const token:string = localStorage.getItem('token') || "";

    if(token !== null && token !== ""){
      const idCliente: string = this._jwtService.getClientId(token) || '';
      this.router.navigate(['carrito/'+ idCliente + '/' + this.idProducto]);
      return 
    }
    this.toastr.error("Debe ingresar para poder añadir productos al carrito", 'Acción Inválida');
  }


  loadProductsImages(){
    this._imageService.getProductsImage(this.idProducto).subscribe({
      next: (data) =>{
        data.forEach( (d:any) => {
          this.images.push('data:image/jpeg;base64,' + d.data)
        });        
      },
      error: (error:HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }

}
