import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
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

  findAllPedidosCliente(idCliente:string):Observable<any>{
    return this.http.get<any>(this.myAppUrl+this.myApiUrl+'/'+idCliente)
  }

  postPedidoCliente(idCliente:string):Observable<any>{
    const cliente = {idCliente: idCliente}
    return this.http.post(this.myAppUrl+this.myApiUrl, cliente);
  }
}
