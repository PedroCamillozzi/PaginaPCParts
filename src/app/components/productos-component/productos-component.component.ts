import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Categoria } from 'src/app/interfaces/Categoria';



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

export class ProductosComponentComponent {
  
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


  constructor(){
    this.dataSource.data = tree_Categoria;
  }

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  

}
