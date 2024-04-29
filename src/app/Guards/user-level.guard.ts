import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';

export const userLevelGuard: CanActivateFn = () => {

  const routerService = inject(Router);
  const clienteService = inject(ClienteService);

  const nivel:string = localStorage.getItem('Tipo de Usuario') || "";
  let descTipoUsuario:string = '';
  const idCliente:string = localStorage.getItem('idCliente') || "";

  clienteService.getDatosCliente(idCliente).subscribe((data) =>{
    descTipoUsuario = data.nombreTipoUsuario || '';
  })

  if(descTipoUsuario !== nivel || descTipoUsuario !== "ADMIN"){
    routerService.navigate(['/home']);
    localStorage.setItem('Tipo de Usuario', 'No vas a entrar')
    return false
  }
  return true
};
