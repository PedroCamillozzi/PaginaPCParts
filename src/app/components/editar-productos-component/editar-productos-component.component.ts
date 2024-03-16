import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrecioProducto } from 'src/app/interfaces/PrecioProductos';
import { Producto } from 'src/app/interfaces/Producto';
import { PrecioProductoService } from 'src/app/services/precioProducto.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-editar-productos-component',
  templateUrl: './editar-productos-component.component.html',
  styleUrls: ['./editar-productos-component.component.css']
})
export class EditarProductosComponentComponent  implements OnInit {
  idProducto:string='';
  producto:Producto={} as Producto;
  precioProducto:PrecioProducto | undefined;
  //image='';
  //imageURL='';
  imagenesURL:string[]=[];
  //imagenes:string[]=[];

  constructor(private _productoService:ProductoService,
              private _activatedRoute:ActivatedRoute,
              private _precioProductoService:PrecioProductoService,
              private router:Router,
              private toastr:ToastrService){
  
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params =>{
      const data = params.get('idProducto') || '';
      this.idProducto = data;
    })
    this.getProducto();
    //this.imageURL = "assets/images/no-image.png"
    //const imageURL = "assets/images/no-image.png"
    //this.imagenesURL.push(imageURL);
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

  guardarCambios(){
    
  }

  elegirImagen(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event:any)=>{
        //this.imagenesURL.push(event.target.result)
       // this.imageURL = event.target.result
      }
      //this.imagenes.push(file);
      //this.image = file;
      
    }
    
  
  }

}
