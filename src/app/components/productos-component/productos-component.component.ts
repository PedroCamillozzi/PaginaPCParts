import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Categoria } from 'src/app/interfaces/Categoria';
import { PrecioProducto } from 'src/app/interfaces/PrecioProductos';
import { Producto } from 'src/app/interfaces/Producto';
import { PrecioProductoService } from 'src/app/services/precioProducto.service';
import { ProductoService } from 'src/app/services/producto.service';




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
  listaPrecioProductos:PrecioProducto[]=[];
  
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
    private toastr:ToastrService){
    this.getProductosAndPrecioActProducto();
    this.dataSource.data = tree_Categoria;
  }

  ngOnInit(): void {
    
  }

  getProductos(){
    this._productoService.getProductos().subscribe(data=>{
      this.listaProductos = data     
      console.log(this.listaProductos);  
    })
    
  }

  getPrecioActProducto(){
    this.listaProductos.forEach(producto => {
      this._precioProductoService.getPrecioProducto(producto.idProducto).subscribe(data=>{
      this.listaPrecioProductos.push(data)
      })
    });
    
  }

  getProductosAndPrecioActProducto() {
    this._productoService.getProductos().subscribe(data => {
        this.listaProductos = data;
        //console.log(this.listaProductos);

        // Crear un array de observables para llamar a getPrecioProducto por cada producto
        const observables = this.listaProductos.map(producto => this._precioProductoService.getPrecioProducto(producto.idProducto));

        // Esperar a que todos los observables se completen utilizando forkJoin
        forkJoin(observables).subscribe(precios => {
            this.listaPrecioProductos = precios;
            //console.log(this.listaPrecioProductos);          
        });
    });
  } 


  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  redirectToProducto(idProducto:Number){
    this.router.navigate(['producto/'+idProducto])
  }

  redirecToCarrito(idProducto:Number){
    const token:string = localStorage.getItem('token') || "";
    const idCliente:string = localStorage.getItem('idCliente') || '';
  
    if(token !== null && token !== ""){
      this.router.navigate(['carrito/'+ idCliente + '/' + idProducto]);
        return 
      }
    this.toastr.error("Debe ingresar para poder añadir productos al carrito", 'Acción Inválida');
  
  }

  ordenarPorTodos(){

  }


  ordenarPorMenorPrecio(){

  }
  
  ordenarPorMayorPrecio() {

  }

}
