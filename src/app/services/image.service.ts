import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'images/'
  }

  postPerfilImage(file:File, idCliente:String):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('imagenPerfil', file);
    return this.http.post(this.myAppUrl + this.myApiUrl + 'perfil/' + idCliente, formData);
  }

  postProductsImage(files:any[], idProducto:String):Observable<any>{
    const formData: FormData = new FormData();
    files.forEach((f:any) => {
      formData.append('photos', f)
    });
    return this.http.post(this.myAppUrl + this.myApiUrl + 'products/' + idProducto, formData)
  }

  getPerfilImage(idCliente:String):Observable<any>{
    return this.http.get<any>(this.myAppUrl + this.myApiUrl + 'perfil/' + idCliente)
  }

  getProductsImage(idProducto:String):Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'products/' + idProducto)
  }

  getPrincipalProductsImage():Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'products/')
  }

  

}
