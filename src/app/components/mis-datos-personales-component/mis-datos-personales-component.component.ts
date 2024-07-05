import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../interfaces/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { ErrorService } from '../../services/error.service';
import { JwtService } from 'src/app/services/jwt.service';
import { ImageService } from 'src/app/services/image.service';



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
  image:any = '../../../assets/images/usuarioPerfil.png'

  constructor( private _clienteService:ClienteService,
              private _toastr:ToastrService,
              private _errorService:ErrorService,
              private _jwtService: JwtService,
              private _imageService:ImageService){

  }

  ngOnInit(): void {
    this.loadPerfilImage();
    this.getDatosCliente();

  }


  getDatosCliente(){
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';
    if(idCliente != ''){
      this._clienteService.getDatosCliente(idCliente).subscribe(data =>{
        this.cliente = data
        this.name = this.cliente.nombre || '';
        this.lastName = this.cliente.apellido || '';
        this.phone = this.cliente.telefono || '';
        
      })
    }

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

  changePerfilImage(event:any){
    const file = event.target.files[0]
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';


    this._imageService.postPerfilImage(file, idCliente).subscribe({
      next: () =>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
    
        reader.onload = () => {
          this.image = reader.result
        };
      },
      error:(event:HttpErrorResponse) =>{
        console.log(event);
        
      }
    })
    
  }

  loadPerfilImage(){
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';
    this._imageService.getPerfilImage(idCliente).subscribe({
      next:(data:any) =>{
        this.image = 'data:image/jpeg;base64,' + data[0].data
      },
      error: (error:HttpErrorResponse) =>{
        console.log(error);
      }
    })
  }


}
