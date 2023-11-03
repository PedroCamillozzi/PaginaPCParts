import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { PrecioProducto } from '../interfaces/PrecioProductos';

@Injectable({
  providedIn: 'root'
})
export class PrecioProductoService {
  private myAppUrl: string;
  private myApiUrl:string;
  
  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'precioProductos/'
  }

  getPrecioProducto(idProducto:number):Observable<PrecioProducto>{
    return this.http.get<PrecioProducto>(this.myAppUrl+this.myApiUrl+idProducto)
  }

}
