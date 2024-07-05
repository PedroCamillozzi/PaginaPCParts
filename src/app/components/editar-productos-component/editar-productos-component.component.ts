import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrecioProducto } from 'src/app/interfaces/PrecioProductos';
import { Producto } from 'src/app/interfaces/Producto';
import { ProductoPrecio } from 'src/app/interfaces/ProductoPrecio';
import { ErrorService } from 'src/app/services/error.service';
import { ImageService } from 'src/app/services/image.service';
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
  images:any = []
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
              private _errorService:ErrorService,
              private _imageService:ImageService){
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
    this.loadProductsImages();

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


  nombreProductoValidate(){
    const nombreProductoValue = this.formularioProducto.get('nombreProducto')?.value;
    if (nombreProductoValue && nombreProductoValue.length > 100) {
      this.nombreProdutoError = true;
      return false;
    }
    this.nombreProdutoError = false;
    return true;
  }

  descripcionValidate(){
    const descripcionValue = this.formularioProducto.get('descripcion')?.value;
    if (descripcionValue && descripcionValue.length  > 100) {
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
        window.location.reload();
      },
      error:(event:HttpErrorResponse)=>{
        this._errorService.msjError(event);
      }
    });
  }

  eliminarProducto(){
    this._productoService.deleteProducto(this.idProducto).subscribe({
      next:(v) =>{
        this.toastr.success('Producto Removido');
        this.router.navigate(['/productos']);
      },
      error: (event:HttpErrorResponse)=>{
        this._errorService.msjError(event)
      }
    })
  }

  
  loadProductsImages(){
    this._imageService.getProductsImage(this.idProducto).subscribe({
      next: (data) =>{
        data.forEach( (d:any) => {
          this.images.push('data:image/jpeg;base64,' + d.data)
        });        
      },
      error: (error:HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }

  changeImages(event:any){
    const files = event.target.files

    if((this.images.length + files.length)  > 5){
      return this.toastr.error('Solo se pueden subir 5 imágenes por producto', 'Error')
    }

    const arrayFiles = Array.from(files)
    

    this._imageService.postProductsImage(arrayFiles, this.idProducto).subscribe({
      next: () =>{
        arrayFiles.forEach((f:any) => {          
          const reader = new FileReader()
          reader.readAsDataURL(f)
      
          reader.onload = () => {
            this.images.push(reader.result) 
          };
        });
      },
      error:(event:HttpErrorResponse) =>{
        console.log(event);
        
      }
    })
    
    return
  }





}
