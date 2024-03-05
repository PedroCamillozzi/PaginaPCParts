import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPedidosComponentComponent } from './mis-pedidos-component.component';
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

class PedidoServiceMock{
  findAllPedidosCliente(idCliente:number):Observable<any>{
    return of([
      {idPedido: 1, fechaPedido: new Date('2023-08-12'), fechaEntrega: new Date('2023-08-22'), estado: "En Proceso", dp:{idPedido: 1, idProducto:1, cantidad:2, pro:{idCliente:1, idProducto:1, nombreProducto:"Core i5", descripcion:"gama media", detallesGenerales:"rapidito", stock:20, idCategoria: 1, precios:[{idProducto:1, fechaDesde: new Date('2023-07-12'), precio:5400}]}},},
      {idPedido: 2, fechaPedido: new Date('2023-08-12'), fechaEntrega: new Date('2023-08-22'), estado: "En Proceso", dp:{idPedido: 2, idProducto:2, cantidad:2, pro:{idCliente:2, idProducto:2, nombreProducto:"Core i7", descripcion:"gama media", detallesGenerales:"rapidito", stock:20, idCategoria: 1, precios:[{idProducto:2, fechaDesde: new Date('2023-07-12'), precio:6400}]}},},
    ])
  }
  getProducto(){
    return;
  }
}

class RouterMock{
  navigate = jest.fn();

  navigateByUrl = jest.fn().mockResolvedValue(true);
}
describe('MisPedidosComponentComponent', () => {
  let component: MisPedidosComponentComponent;
  let fixture: ComponentFixture<MisPedidosComponentComponent>;
  let routerMock:Router;
  let pedidoService:PedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisPedidosComponentComponent],
      providers: [{provide: PedidoService, useClass: PedidoServiceMock},
        {provide: Router, useClass: RouterMock}
        ]
    });
    fixture = TestBed.createComponent(MisPedidosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerMock = TestBed.inject(Router);
    pedidoService = TestBed.inject(PedidoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find all pedidos cliente', ()=>{
    const mockPedidosRealizados = [
      {idPedido: 1, fechaPedido: new Date('2023-08-12'), fechaEntrega: new Date('2023-08-22'), estado: "En Proceso", dp:{idPedido: 1, idProducto:1, cantidad:2, pro:{idCliente:1, idProducto:1, nombreProducto:"Core i5", descripcion:"gama media", detallesGenerales:"rapidito", stock:20, idCategoria: 1, precios:[{idProducto:1, fechaDesde: new Date('2023-07-12'), precio:5400}]}},},
      {idPedido: 2, fechaPedido: new Date('2023-08-12'), fechaEntrega: new Date('2023-08-22'), estado: "En Proceso", dp:{idPedido: 2, idProducto:2, cantidad:2, pro:{idCliente:2, idProducto:2, nombreProducto:"Core i7", descripcion:"gama media", detallesGenerales:"rapidito", stock:20, idCategoria: 1, precios:[{idProducto:2, fechaDesde: new Date('2023-07-12'), precio:6400}]}},},
    ];

    const spyProductosFiltrados = jest.spyOn(pedidoService, 'findAllPedidosCliente');

    component.findAllPedidosCliente();
    expect(spyProductosFiltrados).toHaveBeenCalled();
    expect(component.pedidosRealizadosCliente).toEqual(mockPedidosRealizados);
  });
});
