import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrecioProducto } from 'src/app/interfaces/PrecioProductos';
import { Producto } from 'src/app/interfaces/Producto';
import { ProductoPrecio } from 'src/app/interfaces/ProductoPrecio';
import { ErrorService } from 'src/app/services/error.service';
import { PrecioProductoService } from 'src/app/services/precioProducto.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-editar-productos-component',
  templateUrl: './editar-productos-component.component.html',
  styleUrls: ['./editar-productos-component.component.css']
})
export class EditarProductosComponentComponent  implements OnInit {
  idProducto:string='';
  producto:Producto={} as Producto;
  precioProducto:PrecioProducto | undefined;
  //image='';
  //imageURL='';
  imagenesURL:string[]=[];
  //imagenes:string[]=[];
  formularioProducto: FormGroup<any>;
  nombreProdutoError:boolean = false;
  descripcionError: boolean = false;
  detallesGeneralesError: boolean = false;
  stockError: boolean = false;
  precioError: boolean = false;

  constructor(private _productoService:ProductoService,
              private _activatedRoute:ActivatedRoute,
              private _precioProductoService:PrecioProductoService,
              private router:Router,
              private toastr:ToastrService,
              private formBuilder:FormBuilder,
              private _errorService:ErrorService){
                this.formularioProducto = this.formBuilder.group({
                  nombreProducto: ['', [Validators.required, Validators.maxLength(100)]],
                  descripcion: ['', [Validators.required, Validators.maxLength(100)]],
                  detallesGenerales: ['', [Validators.required, Validators.maxLength(255)]],
                  stock: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[0-9]{1,10}$')]],
                  precio: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
                })
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params =>{
      const data = params.get('idProducto') || '';
      this.idProducto = data;
    })
    this.getProducto();

    //this.imageURL = "assets/images/no-image.png"
    //const imageURL = "assets/images/no-image.png"
    //this.imagenesURL.push(imageURL);
  }

  getProducto(){
    this._productoService.getProducto(this.idProducto).subscribe(data=>{
      this.producto = data
      this.getPrecio(data.idProducto);
      this.formularioProducto.controls['nombreProducto'].setValue(data.nombreProducto);
      this.formularioProducto.controls['descripcion'].setValue(data.descripcion);
      this.formularioProducto.controls['detallesGenerales'].setValue(data.detallesGenerales);
      this.formularioProducto.controls['stock'].setValue(data.stock);
    })
  }

  getPrecio(idProducto:number){
    this._precioProductoService.getPrecioProducto(idProducto).subscribe(data =>{
      this.precioProducto = data;      
      this.formularioProducto.controls['precio'].setValue(data.precio);
    })
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
    if (detallesGeneralesValue && detallesGeneralesValue.length < 255) {
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
    const producto:ProductoPrecio= {
      idProducto: parseInt(this.idProducto),
      nombreProducto: this.formularioProducto.get('nombreProducto')?.value,
      descripcion: this.formularioProducto.get('descripcion')?.value,
      detallesGenerales:this.formularioProducto.get('detallesGenerales')?.value,
      stock:this.formularioProducto.get('stock')?.value,
      fechaDesde: new Date(),
      precio: this.formularioProducto.get('precio')?.value
    }

    this._productoService.putProducto(producto).subscribe({
      next:() => {

        this.toastr.success('Usted ha modificado con éxito el producto', 'Éxito ' + this.formularioProducto.get('nombreProducto')!.value)
      },
      error:(event:HttpErrorResponse)=>{
        this._errorService.msjError(event);
      }
    });
  }





}
