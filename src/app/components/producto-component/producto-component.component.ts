import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/interfaces/Producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-component',
  templateUrl: './producto-component.component.html',
  styleUrls: ['./producto-component.component.css']
})
export class ProductoComponentComponent implements OnInit {
  idProducto:string='';
  producto:Producto={} as Producto;

  constructor(private _productoService:ProductoService,
              private _activatedRoute:ActivatedRoute,
              private router:Router,
              private toastr:ToastrService){
    this._activatedRoute.paramMap.subscribe(params =>{
      const data = params.get('id') || '';
      this.idProducto = data;
    })
    this.getProducto()
  }

  ngOnInit(): void {
  
  }

  getProducto(){
    this._productoService.getProducto(this.idProducto).subscribe(data=>{
      this.producto = data
      console.log(this.producto);
    })    
  }

  loginVerify(){
    const token:string = localStorage.getItem('token') || "";

    if(token !== null && token !== ""){
      this.router.navigate(['carrito/'+this.producto.idProducto]);
      return 
    }
    this.toastr.error("Debe ingresar para poder añadir productos al carrito", 'Acción Inválida');
  }


}
