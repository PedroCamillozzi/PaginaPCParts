import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../../interfaces/Categoria';
import { Producto } from '../../interfaces/Producto';
import { PrecioProductoService } from '../../services/precioProducto.service';
import { ProductoService } from '../../services/producto.service';
import { ClienteService } from '../../services/cliente.service';
import { JwtService } from 'src/app/services/jwt.service';
import { ImageService } from 'src/app/services/image.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductoPrecio } from 'src/app/interfaces/ProductoPrecio';




const tree_Categoria:Categoria[]=[
  {nombreCategoria:'CPU', subCategoria:[{nombreCategoria:'INTEL', subCategoria:[]}, {nombreCategoria:'AMD', subCategoria:[]}]},
  {nombreCategoria:'GPU', subCategoria:[{nombreCategoria:'NVIDIA', subCategoria:[]}, {nombreCategoria:'AMD', subCategoria:[]}]},
  {nombreCategoria:'RAM', subCategoria:[{nombreCategoria:'Kingston', subCategoria:[]}, {nombreCategoria:'Genericas', subCategoria:[]}]},
  ]
  interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
  }


@Component({
  selector: 'app-productos-component',
  templateUrl: './productos-component.component.html',
  styleUrls: ['./productos-component.component.css']
})

export class ProductosComponentComponent implements OnInit {
  listaProductos:Producto[]=[];
  listaProductosPrecio:ProductoPrecio[]= []
  filtrado:string='Todos'
  images:any = []
  
  private _transformer = (node: Categoria, level: number) => {
    return {
      expandable: !!node.subCategoria && node.subCategoria.length > 0,
      name: node.nombreCategoria,
      level: level,
    };
  };
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );
  
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.subCategoria,
  );


  constructor(private _productoService:ProductoService,
    private _precioProductoService:PrecioProductoService,
    private router:Router,
    private toastr:ToastrService,
    private _clienteService:ClienteService,
    private _jwtService: JwtService,
    private _imageService:ImageService){
    this.getProductos();
    this.dataSource.data = tree_Categoria;
  }

  ngOnInit(): void {
    this.loadPrincipalProductsImages();

  }

  getProductos(){
    this._productoService.getProductos().subscribe(data=>{
      this.listaProductos = data 
      this.getPrecioActProducto(); 
    })
    
  }

  getPrecioActProducto(){
    this.listaProductos.forEach(producto => {
      this._precioProductoService.getPrecioProducto(producto.idProducto).subscribe(data=>{
      const prod:ProductoPrecio ={
        idProducto: producto.idProducto,
        nombreProducto: producto.nombreProducto,
        descripcion: producto.descripcion,
        detallesGenerales: producto.detallesGenerales,
        imagen: producto.imagen,
        stock: producto.stock,
        idCategoria: producto.idCategoria,
        fechaDesde: data.fechaDesde,
        precio: data.precio
      }
      this.listaProductosPrecio.push(prod)
      })
    });
    
  }


  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  redirectToProducto(idProducto:Number){
    this.router.navigate(['producto/'+idProducto])
  }

  redirecToCarrito(idProducto:Number){
    const token:string = localStorage.getItem('token') || "";
    const idCliente: string = this._jwtService.getClientId(token) || '';
  
    if(token !== null && token !== ""){
      this.router.navigate(['carrito/'+ idCliente + '/' + idProducto]);
        return 
      }
    this.toastr.error("Debe ingresar para poder añadir productos al carrito", 'Acción Inválida');
  
  }

  esAdmin(){
    const rta = this._clienteService.tipoUsuario();

    if(rta === 1){
      return true;
    }
    else {
      return false;
    }
  }

  redirecToEditarProducto(idProducto:Number){
    const token = localStorage.getItem('token') || '';
    const idCliente: string = this._jwtService.getClientId(token) || '';

    if(this.esAdmin()){
      this.router.navigate(['productoEdit/'+ idCliente + '/' + idProducto]);
      return
    }
    this.toastr.error("No disponible", 'Acción Inválida');

  }

  ordenarPorTodos(){
    this.listaProductosPrecio.sort((a,b)=> a.idProducto - b.idProducto);
    this.filtrado = 'Todos'
  }


  ordenarPorMenorPrecio(){
    this.listaProductosPrecio.sort((a,b) => a.precio - b.precio)
    this.filtrado = 'Menor Precio'
  }
  
  ordenarPorMayorPrecio() {
    this.listaProductosPrecio.sort((a,b) => b.precio - a.precio)
    this.filtrado = 'Mayor Precio'
  }

  loadPrincipalProductsImages(){
    this._imageService.getPrincipalProductsImage().subscribe({
      next: (data) =>{
          this.listaProductos.forEach(lp => {
            data.forEach((d:any) => {
              if(d.filename.includes(lp.idProducto.toString())){
                lp.imagen = 'data:image/jpeg;base64,' + d.data
              }
            });
          if(lp.imagen == undefined){
            lp.imagen = '../../../assets/images/Procesador_Intel_Celeron_G4900.jpg'
          }          
        });
 
      },
      error: (error:HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }

}
