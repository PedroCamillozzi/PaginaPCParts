import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Cliente } from '../interfaces/Cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private myAppUrl: string;
  private myApiUrl:string;

constructor(private http:HttpClient) {
  this.myAppUrl = environment.endpoint;
  this.myApiUrl = 'client/'
 }

 signIn(cliente:Cliente):Observable<any>{
  return this.http.post(this.myAppUrl + this.myApiUrl + 'signIn', cliente)
 }

 login(cliente:Cliente):Observable<string>{
  return this.http.post<string>(this.myAppUrl + this.myApiUrl + 'login', cliente);
 }

 getDatosCliente(idCliente:String):Observable<Cliente>{
  return this.http.get<Cliente>(this.myAppUrl+this.myApiUrl+idCliente)
 }

 patchcambiarDatosCliente(cliente:Cliente):Observable<any>{
  return this.http.patch<any>(this.myAppUrl+this.myApiUrl, cliente)
 }

 patchcambiarContraseñaCliente(cliente:any):Observable<any>{
  return this.http.patch<any>(this.myAppUrl+this.myApiUrl+'cambiaContrasenia/', cliente)
 }

}
