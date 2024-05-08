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
import { Observable, of, throwError } from 'rxjs';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Carrito } from 'src/app/interfaces/Carrito';
import { Producto } from 'src/app/interfaces/Producto';
import { ProductoPrecio } from 'src/app/interfaces/ProductoPrecio';
import { PrecioProducto } from 'src/app/interfaces/PrecioProductos';
import { RouterTestingModule } from '@angular/router/testing';

class CarritoServiceMock{
  getProductosCarritoCliente():Observable<Carrito[]>{
    return of([{idProducto: 1, idCliente:1, cantidad:20}])
  }
  patchProductoCarritoCliente(clienteProducto:any):Observable<any>{
    return of();
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
  msjError(event:HttpErrorResponse){
    return 
  }
}

class ProductoServiceMock{
  getProducto(idProducto:string):Observable<Producto>{
    return of({idProducto:1,nombreProducto:'Intel i7', descripcion:"buenaso", detallesGenerales:"alta gama", stock:10})
  } 
  getProductos(){
    return
  }
  
  putProducto(producto:ProductoPrecio){
    return
  }
  
  postProducto(producto:ProductoPrecio){
    return 
  }
}

class PrecioProductoServiceMock{
  getPrecioProducto(idProducto:number):Observable<PrecioProducto>{
    return of({idProducto: 1, fechaDesde: new Date('2023-12-21'), precio: 1200})
  }
}

class ToastrServiceMock{

}

class PedidoServiceMock{

}

class DetallePedidoServiceMock{

}



describe('CarritoComponentComponent', () => {
  let component: CarritoComponentComponent;
  let fixture: ComponentFixture<CarritoComponentComponent>;
  let carritoServiceMock: CarritoService;
  let productoServiceMock: ProductoServiceMock;
  let precioProductoMock: PrecioProductoServiceMock;
  let router:Router;
  let errorServiceMock: ErrorServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoComponentComponent],
      imports:[HttpClientModule, RouterTestingModule],
      providers:[{ provide: CarritoService, useClass: CarritoServiceMock},
                 { provide:ActivatedRoute, useClass:ActivatedRouteMock},
                 { provide: ErrorService, useClass:ErrorServiceMock},
                 { provide: ProductoService, useClass: ProductoServiceMock},
                 { provide: PrecioProductoService, useClass: PrecioProductoServiceMock},
                 { provide: ToastrService, useClass: ToastrServiceMock},
                 { provide: PedidoService, useClass:PedidoServiceMock},
                 { provide: DetallePedidoService, useClass: DetallePedidoServiceMock}
                 ]
    });
    fixture = TestBed.createComponent(CarritoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


    carritoServiceMock = TestBed.inject(CarritoService);
    productoServiceMock = TestBed.inject(ProductoService)
    precioProductoMock = TestBed.inject(PrecioProductoService)
    router = TestBed.inject(Router)
    errorServiceMock = TestBed.inject(ErrorService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getCarritoCliente if exist idCliente', () => {
    localStorage.setItem('idCliente', '1');

    const mockCarrito = [{idProducto: 1, idCliente:1, cantidad:20}]

    const spyGetProductosCarritoCliente = jest.spyOn(carritoServiceMock, 'getProductosCarritoCliente')

    spyGetProductosCarritoCliente.mockReturnValue(of(mockCarrito))

    component.getCarritoCliente();

    expect(spyGetProductosCarritoCliente).toHaveBeenCalled()
    
    expect(component.carritoCliente).toEqual(mockCarrito);

    localStorage.removeItem('idCliente');

    
  });

  it("should'nt getCarritoCliente if not exist idCliente", () => {
    localStorage.setItem('idCliente', '');

    const spyGetProductosCarritoCliente = jest.spyOn(carritoServiceMock, 'getProductosCarritoCliente')

    spyGetProductosCarritoCliente.mockReturnValue(of())

    component.getCarritoCliente();

    expect(spyGetProductosCarritoCliente).not.toHaveBeenCalled()

    localStorage.removeItem('idCliente');
  });

  it('should get producto cliente',()=>{
    const mockProducto = {idProducto:1,nombreProducto:'Intel i7', descripcion:"buenaso", detallesGenerales:"alta gama", stock:10}
    component.carritoCliente = [{idProducto: 1, idCliente:1, cantidad:20}]

    const spyGetProducto = jest.spyOn(productoServiceMock, 'getProducto')

    spyGetProducto.mockReturnValue(of(mockProducto))

    component.getProductoCliente();

    expect(spyGetProducto).toHaveBeenCalled()
    
    expect(component.productosCliente).toEqual([mockProducto]);

  })

  it('should get precio producto cliente', ()=>{
    const mockPrecioProducto = {idProducto: 1, fechaDesde: new Date('2023-12-21'), precio: 1200}
    component.carritoCliente = [{idProducto: 1, idCliente:1, cantidad:20}]

    const spyGetPrecioProducto = jest.spyOn(precioProductoMock, 'getPrecioProducto')

    spyGetPrecioProducto.mockReturnValue(of(mockPrecioProducto));

    component.getPrecioProductosCliente();

    expect(spyGetPrecioProducto).toHaveBeenCalled()
    
    expect(component.precioProductosCliente).toEqual([mockPrecioProducto]);

  })

  it('should agregar producto al carrito', ()=>{
    localStorage.setItem('idCliente', '1');
    const idCliente = localStorage.getItem('idCliente');
    component.idProducto = '1'

    const spyPatchProductoCarritoCliente = jest.spyOn(carritoServiceMock, 'patchProductoCarritoCliente')
    spyPatchProductoCarritoCliente.mockReturnValue(of('Ok'))

    const spyRouterNavigate = jest.spyOn(router, 'navigate')

    component.agregarProductoAlCarrito()

    expect(spyPatchProductoCarritoCliente).toHaveBeenCalled();

    expect(spyRouterNavigate).toHaveBeenCalledWith(['carrito/'+idCliente]);


    localStorage.removeItem('idCliente');
  })

  it("shouldn't agregar producto al carrito", ()=>{
    localStorage.setItem('idCliente', '1');
    component.idProducto = '1'

    const spyPatchProductoCarritoCliente = jest.spyOn(carritoServiceMock, 'patchProductoCarritoCliente').mockReturnValue(new Observable((subscriber) => {
      subscriber.error(new HttpErrorResponse({ status: 500 }));
  }));
    const msjErrorSpy = jest.spyOn(errorServiceMock, 'msjError');

    component.agregarProductoAlCarrito()

    expect(spyPatchProductoCarritoCliente).toHaveBeenCalled();
    expect(msjErrorSpy).toHaveBeenCalledWith(expect.any(HttpErrorResponse));

    localStorage.removeItem('idCliente');
  })

  it('should recuperar Id Producto', ()=>{
    component.recuperaIdProducto()

    expect(component.idProducto).toBe('1')
  })

  it('should verificar Id Producto and call agregarProductoAlCarrito', () =>{
    component.idProducto = ''
    expect(component.idProducto).toBe('')

    const resultAddProduct = jest.spyOn(component, 'agregarProductoAlCarrito')
    const resultCheckId = jest.spyOn(component, 'verificarIdProducto')

    component.verificarIdProducto()

    expect(component.idProducto).toBe('1')
    expect(resultCheckId).toHaveBeenCalled()
    expect(resultAddProduct).toHaveBeenCalled()
  })

  it("should'nt verificar Id Producto and not call agregarProductoAlCarrito", () =>{
    component.idProducto = ''
    expect(component.idProducto).toBe('')

    const resultAddProduct = jest.spyOn(component, 'agregarProductoAlCarrito')
    const resultCheckId = jest.spyOn(component, 'verificarIdProducto')

    component.verificarIdProducto()

    expect(component.idProducto).toBe('')
    expect(resultCheckId).toHaveBeenCalled()
    expect(resultAddProduct).not.toHaveBeenCalled()
  })

  it('should calculate the total', () => {
    const productoCarrito = {idProducto: 1, idCliente: 2, cantidad: 3};
    const productoPrecio = {idProducto: 1, fechaDesde: new Date('2023-12-21'), precio: 100};

    component.total = 0;
    component.calcularTotal(productoCarrito, productoPrecio);

    expect(component.total).toEqual(productoCarrito.cantidad * productoPrecio.precio)


  });

  it('should aumentarCantidad', () =>{
    const pc:Producto = {idProducto:1,nombreProducto:'Intel i7', descripcion:"buenaso", detallesGenerales:"alta gama", stock:1}

    const c: Producto = {idProducto:1,nombreProducto:'Intel i7', descripcion:"buenaso", detallesGenerales:"alta gama", stock:10}

  })
});
