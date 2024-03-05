import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../../interfaces/Producto';
import { ProductoService } from '../../services/producto.service';
import { PrecioProducto } from '../../interfaces/PrecioProductos';
import { PrecioProductoService } from '../../services/precioProducto.service';

@Component({
  selector: 'app-producto-component',
  templateUrl: './producto-component.component.html',
  styleUrls: ['./producto-component.component.css']
})
export class ProductoComponentComponent implements OnInit {
  idProducto:string='';
  producto:Producto={} as Producto;
  precioProducto:PrecioProducto | undefined;

  constructor(private _productoService:ProductoService,
              private _activatedRoute:ActivatedRoute,
              private _precioProductoService:PrecioProductoService,
              private router:Router,
              private toastr:ToastrService){
  
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params =>{
      const data = params.get('id') || '';
      this.idProducto = data;
    })
    this.getProducto()
  }

  getProducto(){
    this._productoService.getProducto(this.idProducto).subscribe(data=>{
      this.producto = data
      console.log(this.producto);
      this.getPrecio(data.idProducto)
    })
  }

  getPrecio(idProducto:number){
    this._precioProductoService.getPrecioProducto(idProducto).subscribe(data =>{
      this.precioProducto = data;
      console.log(this.precioProducto);
      
    })
  }

  loginVerify(){
    const token:string = localStorage.getItem('token') || "";

    if(token !== null && token !== ""){
      const idCliente:string = localStorage.getItem('idCliente') || '';
      this.router.navigate(['carrito/'+ idCliente + '/' + this.idProducto]);
      return 
    }
    this.toastr.error("Debe ingresar para poder añadir productos al carrito", 'Acción Inválida');
  }


}
