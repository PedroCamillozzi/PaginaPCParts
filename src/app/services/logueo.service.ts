import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogueoService {

constructor() { }

tokenExpirado(token:string):boolean{
  const decodedToken = this.decodeToken(token);
  if (!decodedToken || !decodedToken.exp) {
    return true; // Si no se puede decodificar el token o no tiene fecha de expiración
  }
  const currentTime = Date.now() / 1000; // Tiempo actual en segundos
  console.log('Decoded Token Exp:', decodedToken.exp);
  console.log('Current Time:', currentTime);
  return decodedToken.exp < currentTime;
}

private decodeToken(token: string): any {
  try {
    const tokenPayload = token.split('.')[1];
    return JSON.parse(atob(tokenPayload));
  } catch (error) {
    return null;
  }
}

}
