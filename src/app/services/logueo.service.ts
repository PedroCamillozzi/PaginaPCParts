import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LogueoService {

constructor() { }

tokenExpirado(token:string):any{
  const decodedToken = jwt_decode(token);
  if (!decodedToken || token == '') {
    return true; // Si no se puede decodificar el token o no tiene fecha de expiración
  }
}
  /*const currentTime = Date.now() / 1000; // Tiempo actual en segundos
  console.log('Decoded Token Exp:', decodedToken;
  console.log('Current Time:', currentTime);
  return decodedToken.exp < currentTime;


private decodeToken(token: string): any {
  try {
    const tokenPayload = bcrypt.
    return JSON.parse(atob(tokenPayload));
  } catch (error) {
    return null;
  }
}*/

}
