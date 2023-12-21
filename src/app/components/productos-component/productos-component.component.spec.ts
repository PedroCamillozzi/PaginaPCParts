import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosComponentComponent } from './productos-component.component';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { PrecioProductoService } from '../../services/precioProducto.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { PrecioProducto } from 'src/app/interfaces/PrecioProductos';

class ProductoServiceMock{
  getProductos():Observable<any>{
    return of([
      { id: 1, nombre: 'Producto 1', precio: 100 },
      { id: 2, nombre: 'Producto 2', precio: 200 }
    ])
  }
  getProducto(){
    return;
  }
}

class PrecioProductoServiceMock{
  getPrecioProducto(idProd:number):Observable<PrecioProducto>{
      return of({ idProducto: 1, precio: 100, fechaDesde: new Date('2023-08-12') });

  }
}

class ToastrServiceMock{
  error(){
    return of('Debe ingresar para poder añadir productos al carrito', 'Acción Inválida')
  }
}


class RouterMock{
  navigate = jest.fn();
}

const localStorageMock = {
  getItem: jest.fn(),
};



describe('ProductosComponentComponent', () => {
  let component: ProductosComponentComponent;
  let fixture: ComponentFixture<ProductosComponentComponent>;
  let productoService: ProductoService;
  let routerMock:Router;
  let toastrMock:ToastrService;
  let precioProductoService:PrecioProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosComponentComponent],
      providers: [{provide: ProductoService, useClass: ProductoServiceMock},
                  {provide: PrecioProductoService, useClass: PrecioProductoServiceMock},
                  {provide: ToastrService, useClass: ToastrServiceMock},
                  {provide: Router, useClass: RouterMock}]
    });
    fixture = TestBed.createComponent(ProductosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    productoService = TestBed.inject(ProductoService);
    routerMock = TestBed.inject(Router);
    toastrMock = TestBed.inject(ToastrService);

    jest.spyOn(window, 'localStorage', 'get').mockReturnValue(localStorageMock as unknown as Storage);

    precioProductoService = TestBed.inject(PrecioProductoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('redirect to producto', async () => {
    const router = TestBed.inject(Router) as unknown as RouterMock;
    const spyNavigate = jest.spyOn(router, 'navigate');
  
    component.redirectToProducto(1);
  
    await fixture.whenStable(); // Esperar a que se resuelvan las tareas asincrónicas
  
    expect(spyNavigate).toHaveBeenCalled();
    expect(spyNavigate).toHaveBeenCalledWith(['producto/1']);
  });
  
  

  it('should get productos', () => {
    const mockProducts = [
      { id: 1, nombre: 'Producto 1', precio: 100 },
      { id: 2, nombre: 'Producto 2', precio: 200 }
    ];
    const getProductosSpy = jest.spyOn(productoService, 'getProductos');
  
    component.getProductos();
    expect(getProductosSpy).toHaveBeenCalled();  
    expect(component.listaProductos).toEqual(mockProducts);
  });

  it('should navigate to carrito if token is present', () => {
    const token = 'fakeToken';
    const idCliente = '';
    

    jest.spyOn(localStorageMock, 'getItem').mockReturnValueOnce(token);
    jest.spyOn(localStorageMock, 'getItem').mockReturnValueOnce(idCliente);

    const routerNavigateSpy = jest.spyOn(routerMock, 'navigate');

    component.redirecToCarrito(1);

    expect(localStorageMock.getItem).toHaveBeenCalledWith('token');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('idCliente');
    expect(routerNavigateSpy).toHaveBeenCalledWith(['carrito/' + idCliente + '/' + 1]);
  });
  

  it('should show error if token is not present', () => {
    const localStorageGetItemSpy = jest.spyOn(localStorage, 'getItem');
    localStorageGetItemSpy.mockReturnValueOnce(null);

    const toastrErrorSpy = jest.spyOn(toastrMock, 'error');

    component.redirecToCarrito(1);

    expect(localStorageGetItemSpy).toHaveBeenCalledWith('token');
    expect(toastrErrorSpy).toHaveBeenCalledWith('Debe ingresar para poder añadir productos al carrito', 'Acción Inválida');
  });

  it('should getPrecioActProducto', () => {
    const mockListaProductos = [
      { idProducto: 1, nombreProducto: 'Intel Core i9', descripcion: 'rapidisimo', detallesGenerales: 'gama alta', stock: 10, idCategoria: 1 }
    ];
  
    component.listaProductos = mockListaProductos;
  
    const mockPrecioProducto: PrecioProducto = 
      { idProducto: 1, precio: 100, fechaDesde: new Date('2023-08-12') }
    ;
    const spyPrecioProducto = jest.spyOn(precioProductoService, 'getPrecioProducto')
      .mockReturnValueOnce(of(mockPrecioProducto));
  
    component.listaPrecioProductos = [{ idProducto: 1, precio: 100, fechaDesde: new Date('2023-08-12') }];
  
    component.getPrecioActProducto();
  
    expect(spyPrecioProducto).toHaveBeenCalled();
    expect(component.listaPrecioProductos).toContainEqual(mockPrecioProducto);
  });

  it('should orderByAll', () => {
    component.ordenarPorTodos();
  });

  it('should orderByMinorPrice', () => {
    component.ordenarPorMenorPrecio();
  });

  it('should orderByMayorPrice', () => {
    component.ordenarPorMayorPrecio();
  });
  
  
});
