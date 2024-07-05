import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

constructor() { }

decodeToken(token: string): any {
  try {
    return jwt_decode(token);
  } catch (Error) {
    console.error("Error decodificando el token", Error);
    return null;
  }
}

getClientId(token: string): string | null {
  const decodedToken = this.decodeToken(token);
  return decodedToken ? decodedToken.idCliente : null;
}

getTipoUsuario(token: string): string | null {
  const decodedToken = this.decodeToken(token);
  return decodedToken ? decodedToken.tipoUsuario : null;
}

}
