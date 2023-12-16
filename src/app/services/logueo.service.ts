import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LogueoService {

constructor() { }

tokenExpirado(token:string):Boolean{
  try {
    if (!token) {
      return true;
    }

    const decodedToken: any = jwt_decode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      return true; 
    }

    return false;
  } catch (error) {
    return true; 
  }
}

}
