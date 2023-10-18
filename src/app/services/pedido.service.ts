import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Pedido } from '../interfaces/Pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private myAppUrl:string;
  private myApiUrl:string;
  
  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'pedido/'
   }

  findAllPedidosCliente(idCliente:string):Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.myAppUrl+this.myApiUrl+'/'+idCliente)
  }

  postPedidoCliente(pedido:any):Observable<any>{
    return this.http.post(this.myAppUrl+this.myApiUrl, pedido);
  }
}
