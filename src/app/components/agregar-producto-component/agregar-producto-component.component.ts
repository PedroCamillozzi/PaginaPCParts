import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductoPrecio } from 'src/app/interfaces/ProductoPrecio';
import { ErrorService } from 'src/app/services/error.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-agregar-producto-component',
  templateUrl: './agregar-producto-component.component.html',
  styleUrls: ['./agregar-producto-component.component.css']
})
export class AgregarProductoComponentComponent implements OnInit {
  imagenesURL:string[]=[];
  formularioProducto: FormGroup<any>;
  nombreProdutoError:boolean = false;
  descripcionError: boolean = false;
  detallesGeneralesError: boolean = false;
  stockError: boolean = false;
  precioError: boolean = false;

  constructor(private formBuilder:FormBuilder,
              private _productoService: ProductoService,
              private toastr: ToastrService,
              private _errorService: ErrorService
  ) 
  {
    this.formularioProducto = this.formBuilder.group({
      nombreProducto: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
      detallesGenerales: ['', [Validators.required, Validators.maxLength(255)]],
      stock: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[0-9]{1,10}$')]],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
   })
  }

  ngOnInit() {
  }

  guardarCambios(){
    
  }

  elegirImagen(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event:any)=>{
        //this.imagenesURL.push(event.target.result)
       // this.imageURL = event.target.result
      }
      //this.imagenes.push(file);
      //this.image = file;
      
    }
    
  
  }

  nombreProductoValidate(){
    const nombreProductoValue = this.formularioProducto.get('nombreProducto')?.value;
    if (nombreProductoValue && nombreProductoValue.length < 100) {
      this.nombreProdutoError = true;
      return false;
    }
    this.nombreProdutoError = false;
    return true;
  }

  descripcionValidate(){
    const descripcionValue = this.formularioProducto.get('descripcion')?.value;
    if (descripcionValue && descripcionValue.length < 100) {
      this.descripcionError = true;
      return false;
    }
    this.descripcionError = false;
    return true;
  }

  detallesGeneralesValidate(){
    const detallesGeneralesValue = this.formularioProducto.get('detallesGenerales')?.value;
    if (detallesGeneralesValue && detallesGeneralesValue.length > 255) {
      this.detallesGeneralesError = true;
      return false;
    }
    this.detallesGeneralesError = false;
    return true;
  }
  
  stockValidate(){
    const stockValue = this.formularioProducto.get('stock')?.value;
    if(stockValue && stockValue.length > 0 && stockValue < 0){
      this.stockError = true;
      return false;
    }
    this.stockError = false;
    return true
  }

  precioValidate(){
    const precioValue = this.formularioProducto.get('precio')?.value;
    if(precioValue && precioValue < 0){
      this.precioError = true;
      return false;
    }
    this.precioError = false;
    return true
  }

  registrar(){
    const producto:any= {
      nombreProducto: this.formularioProducto.get('nombreProducto')?.value,
      descripcion: this.formularioProducto.get('descripcion')?.value,
      detallesGenerales:this.formularioProducto.get('detallesGenerales')?.value,
      stock:this.formularioProducto.get('stock')?.value,
      precio: this.formularioProducto.get('precio')?.value
    }

    this._productoService.postProducto(producto).subscribe({
      next:() => {

        this.toastr.success('Usted ha modificado con éxito el producto', 'Éxito ' + this.formularioProducto.get('nombreProducto')!.value)
        window.location.reload();
      },
      error:(event:HttpErrorResponse)=>{
        this._errorService.msjError(event);
      }
    });
  }

}
