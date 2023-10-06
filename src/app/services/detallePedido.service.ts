import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { DetallePedidos } from '../interfaces/DetallePedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {
    private myAppUrl:string;
    private myApiUrl:string;


  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'detallePedido/'
  }

  findAllDetallePedidoCliente(idPedido:string):Observable<DetallePedidos[]>{
    return this.http.get<DetallePedidos[]>(this.myAppUrl+this.myApiUrl+idPedido)
  }

  

}
