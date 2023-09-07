import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Producto } from '../interfaces/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
private myAppUrl: string;
private myApiUrl:string;

constructor(private http:HttpClient) {
  this.myAppUrl = environment.endpoint;
  this.myApiUrl = 'productos/'
 }

getProductos():Observable<Producto[]>{
  return this.http.get<Producto[]>(this.myAppUrl+this.myApiUrl + 'all')
}

getProducto(idProducto:String):Observable<Producto>{
  return this.http.get<Producto>(this.myAppUrl + this.myApiUrl + idProducto)
}

}
