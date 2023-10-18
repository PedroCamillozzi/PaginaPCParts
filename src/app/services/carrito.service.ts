import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Carrito } from '../interfaces/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private myAppUrl:string;
  private myApiUrl:string;
constructor(private http:HttpClient) { 
  this.myAppUrl = environment.endpoint;
  this.myApiUrl = 'carrito/'
}

getProductosCarritoCliente(idCliente:string):Observable<Carrito[]>{
  return this.http.get<Carrito[]>(this.myAppUrl+this.myApiUrl+idCliente);
}

patchProductoCarritoCliente(clienteProducto:any):Observable<any>{
  return this.http.patch<any>(this.myAppUrl+this.myApiUrl+'addItem', clienteProducto)
}

patchModificarCantidadCarritoCliente(cc:Carrito):Observable<any>{
  return this.http.patch<any>(this.myAppUrl+this.myApiUrl+'addCantidad', cc)
}

removeProductoCarritoCliente(productoCarrito:Carrito):Observable<any>{
  return this.http.delete<any>(this.myAppUrl+this.myApiUrl+'/'+productoCarrito.idCliente+'/'+productoCarrito.idProducto)
}

removeAllProductosCliente(idCliente:string):Observable<any>{
  return this.http.delete(this.myAppUrl+this.myApiUrl+'/'+idCliente);
}
}
