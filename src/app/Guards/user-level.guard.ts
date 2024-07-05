import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { JwtService } from '../services/jwt.service';

export const userLevelGuard: CanActivateFn = () => {

  const routerService = inject(Router);
  const clienteService = inject(ClienteService);
  const _jwtService = inject(JwtService)

  const token = localStorage.getItem('token') || '';
  const nivel:string = _jwtService.getTipoUsuario(token) || '';
  
  let descTipoUsuario:string = '';
  const idCliente: string = _jwtService.getClientId(token) || '';

  clienteService.getDatosCliente(idCliente).subscribe((data) =>{
    descTipoUsuario = data.nombreTipoUsuario || '';      
      
  if(descTipoUsuario !== nivel || descTipoUsuario !== "ADMIN"){
    routerService.navigate(['/home']);
    return false
  }
  return true
  })

  return true
};
