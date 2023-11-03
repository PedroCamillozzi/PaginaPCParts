import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../interfaces/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-registro-component',
  templateUrl: './registro-component.component.html',
  styleUrls: ['./registro-component.component.css']
})
export class RegistroComponentComponent {
  dni:string = '';
  name:string='';
  lastName:string='';
  phone:string=''
  email:string='';
  password:string='';
  repeatPassword:string= '';
  loading:boolean= false

  constructor(private toastr:ToastrService,
              private _clienteService:ClienteService,
              private _errorService:ErrorService){
    
  }



  registrar(){
    if(this.email == '' || this.password == '' || this.repeatPassword == '' || this.dni == '' || this.name == '' || this.lastName == '' || this.phone == ''){
      this.toastr.error('Todos los campos son obligatorios', 'Error')
      return
    }
    //Faltan Validaciones

    const cliente:Cliente ={
      nombre: this.name,
      apellido: this.lastName,
      dni:this.dni,
      email: this.email,
      telefono: this.phone,
      contraseña: this.password
    }

    this.loading = true;
    this._clienteService.signIn(cliente).subscribe({
      next:(v) => {
        this.loading = false;
        this.toastr.success('Usted ha sido registrado con éxito', 'Hola ' + this.name)
      },
      error:(event:HttpErrorResponse)=>{
        this._errorService.msjError(event);
        this.loading = false;
      }
    });
  }

}
