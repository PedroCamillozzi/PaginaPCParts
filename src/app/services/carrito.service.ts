import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/Producto';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';

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

getProductosCarritoCliente(idCliente:string):Observable<Producto[]>{
  return this.http.get<Producto[]>(this.myAppUrl+this.myApiUrl+idCliente);
}

patchProductoCarritoCliente(clienteProducto:any):Observable<any>{
  return this.http.patch<any>(this.myAppUrl+this.myApiUrl+'addItem', clienteProducto)
}
}
