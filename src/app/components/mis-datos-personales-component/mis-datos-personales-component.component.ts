import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/interfaces/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ErrorService } from 'src/app/services/error.service';



@Component({
  selector: 'app-mis-datos-personales-component',
  templateUrl: './mis-datos-personales-component.component.html',
  styleUrls: ['./mis-datos-personales-component.component.css']
})

export class MisDatosPersonalesComponentComponent implements OnInit {
  name:string='';
  lastName:string='';
  phone:string='';
  cliente:Cliente={
    email: '',
    contraseña: ''
  }
  oldPassword:string='';
  newPassword:string='';
  repeatNewPassword:string='';
  recupera:boolean = false;

  constructor( private _clienteService:ClienteService,
              private _toastr:ToastrService,
              private _errorService:ErrorService){

  }

  async ngOnInit(): Promise<void> {
    await this.getDatosCliente();

  }


  async getDatosCliente(){
    const idCliente = localStorage.getItem('idCliente') || '';
    this._clienteService.getDatosCliente(idCliente).subscribe(data =>{
      this.cliente = data
      this.name = this.cliente.nombre || '';
      this.lastName = this.cliente.apellido || '';
      this.phone = this.cliente.telefono || '';
      
    })

  }

  cambiarDatos(){
    this.cliente ={
      idCliente: this.cliente.idCliente,
      email: '',
      contraseña: '',
      nombre:this.name,
      apellido: this.lastName,
      telefono: this.phone
    }
    console.log(this.cliente);
    
    this._clienteService.patchcambiarDatosCliente(this.cliente).subscribe({
      next: (data) =>{
      this._toastr.success(data.msg, 'Enhorabuena');
    },
    error: (err:HttpErrorResponse) => {
      this._errorService.msjError(err)
    }})
  }

  mostrarFormulario(){
    this.recupera=true;
  }

  cambiarContrasenia(){
    if(this.newPassword != this.repeatNewPassword){
      this._toastr.error('Las nuevas contraseñas no coinciden!', 'Error')
      return
    }

    const cambioContraseñaCliente ={
      idCliente: this.cliente.idCliente,
      contraseñaVieja: this.oldPassword,
      contraseñaNueva: this.newPassword,
      repeticionContraseñaNueva: this.repeatNewPassword
    }
    this._clienteService.patchcambiarContraseñaCliente(cambioContraseñaCliente).subscribe({
      next: (data) => {
        this._toastr.success(data.msg, 'Enhorabuena');
      },
      error: (err) =>{
        this._errorService.msjError(err);
      }
    })
  }
}
