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

 login(cliente:Cliente):Observable<string>{
  return this.http.post<string>(this.myAppUrl + this.myApiUrl + 'login', cliente);
 }

}
