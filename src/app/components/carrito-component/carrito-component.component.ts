import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/interfaces/Producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-carrito-component',
  templateUrl: './carrito-component.component.html',
  styleUrls: ['./carrito-component.component.css']
})
export class CarritoComponentComponent implements OnInit {
  productosCliente:Producto[]=[];
  idProducto:string='';
  constructor(private _carritoService:CarritoService,
              private _activatedRoute:ActivatedRoute,
              private _errorService:ErrorService){
  }

  ngOnInit(): void {
    this.getProductosCliente();
    this.verificarIdProducto();
  }

  async getProductosCliente(){
    const idCliente:string = localStorage.getItem('idCliente') || '';
    this._carritoService.getProductosCarritoCliente(idCliente).subscribe(data =>{
      this.productosCliente = data
    
    })
  }

  async agregarProductoAlCarrito(){
    const idCliente:string = localStorage.getItem('idCliente') || ''; 
    const productoCliente ={
      idCliente: idCliente,
      idProducto: this.idProducto,
      cantidad: 1
    }
    this._carritoService.patchProductoCarritoCliente(productoCliente).subscribe({
      next: async (data)=>{
          await this.getProductosCliente();
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

  

}
