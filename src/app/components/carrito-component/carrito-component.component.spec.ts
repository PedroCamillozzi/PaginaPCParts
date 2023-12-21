import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoComponentComponent } from './carrito-component.component';
import { CarritoService } from '../../services/carrito.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from '../../services/error.service';
import { ProductoService } from '../../services/producto.service';
import { PrecioProductoService } from '../../services/precioProducto.service';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from '../../services/pedido.service';
import { DetallePedidoService } from '../../services/detallePedido.service';
import { Observable, of } from 'rxjs';

class CarritoServiceMock{
  getProductosCarritoCliente(idCliente:string):Observable<any>{
    if(idCliente === '1'){
      return of({idProducto: 1, idCliente:1, cantidad:20});
    }
    return of();
  }
  patchProductoCarritoCliente(){
    return;
  }
  patchModificarCantidadCarritoCliente(){
    return;
  }
  removeProductoCarritoCliente(){
    return;
  } 
  removeAllProductosCliente(){
    return;
  }
}

class ActivatedRouteMock {
  paramMap = of({
    get: (key: string) => '1' // Simulación del método get en paramMap para devolver '123'
  });
}

class ErrorServiceMock{

}

class ProductoServiceMock{

}

class PrecioProductoServiceMock{

}

class ToastrServiceMock{

}

class RouterMock{

}

class PedidoServiceMock{

}

class DetallePedidoServiceMock{

}



describe('CarritoComponentComponent', () => {
  let component: CarritoComponentComponent;
  let fixture: ComponentFixture<CarritoComponentComponent>;
  let carritoServiceMock :CarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoComponentComponent],
      providers:[{ provide: CarritoService, useClass: CarritoServiceMock},
                 { provide:ActivatedRoute, useClass:ActivatedRouteMock},
                 { provide: ErrorService, useClass:ErrorServiceMock},
                 { provide: ProductoService, useClass: ProductoServiceMock},
                 { provide: PrecioProductoService, useClass: PrecioProductoServiceMock},
                 { provide: ToastrService, useClass: ToastrServiceMock},
                 { provide: Router, useClass: RouterMock},
                 { provide: PedidoService, useClass:PedidoServiceMock},
                 { provide: DetallePedidoService, useClass: DetallePedidoServiceMock}
                 ]
    });
    fixture = TestBed.createComponent(CarritoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    carritoServiceMock = TestBed.inject(CarritoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should getCarritoCliente', () => {
    const idCliente = '1';

    const spyGetProductosCarritoCliente = jest.spyOn(carritoServiceMock, 'getProductosCarritoCliente')

    component.getCarritoCliente();

    expect(spyGetProductosCarritoCliente).toHaveBeenCalledWith(idCliente);

    expect(component.carritoCliente).toEqual([{idProducto: 1, idCliente:1, cantidad:20}]);

    
  });*/

  it('should calculate the total', () => {
    const productoCarrito = {idProducto: 1, idCliente: 2, cantidad: 3};
    const productoPrecio = {idProducto: 1, fechaDesde: new Date('2023-12-21'), precio: 100};

    component.total = 0;
    component.calcularTotal(productoCarrito, productoPrecio);

    expect(component.total).toEqual(productoCarrito.cantidad * productoPrecio.precio)


  });

  /*it('should increase quantity ', () => {

  });*/
});
