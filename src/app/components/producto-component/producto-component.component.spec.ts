import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoComponentComponent } from './producto-component.component';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

class ProductoServiceMock{
  getProductos(){
    return of([
      { id: 1, nombre: 'Producto 1', precio: 100 },
      { id: 2, nombre: 'Producto 2', precio: 200 }
    ])
  }
  getProducto(){
    return of({id: 1, nombre: 'Producto 1', precio: 100 })
  }
}

class ActivatedRouteMock {
  paramMap = of({
    get: (key: string) => '123' // Simulación del método get en paramMap para devolver '123'
  });
}
class RouterMock{
  navigate = jest.fn();
}
class ToastrServiceMock{
  error(){
    return of('Debe ingresar para poder añadir productos al carrito', 'Acción Inválida')
  }
}

const localStorageMock = {
  getItem: jest.fn(),
};

describe('ProductoComponentComponent', () => {
  let component: ProductoComponentComponent;
  let fixture: ComponentFixture<ProductoComponentComponent>;
  let productoService: ProductoService;
  let routerMock:Router;
  let toastrMock:ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoComponentComponent],
      providers: [{provide: ProductoService, useClass: ProductoServiceMock},
                  {provide: ActivatedRoute, useClass: ActivatedRouteMock},
                  {provide: Router, useClass: RouterMock},
                  {provide: ToastrService, useClass: ToastrServiceMock},
                  ]
    });
    fixture = TestBed.createComponent(ProductoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    productoService = TestBed.inject(ProductoService);
    routerMock = TestBed.inject(Router);
    toastrMock = TestBed.inject(ToastrService);

    jest.spyOn(window, 'localStorage', 'get').mockReturnValue(localStorageMock as unknown as Storage);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set idProducto from route params', () => {
    expect(component.idProducto).toBe('123'); // Verifica que el idProducto se haya establecido correctamente
  });

  it('should getProducto', ()=>{
    const mockProduct = { id: 1, nombre: 'Producto 1', precio: 100 };

    const getProductoSpy = jest.spyOn(productoService, 'getProducto');

    component.getProducto();
    expect(getProductoSpy).toHaveBeenCalled();  
    expect(component.producto).toEqual(mockProduct);
  });

  it('should navigate to carrito if token is present', () => {
    const token = 'fakeToken';
    const idCliente = '';
    component.idProducto = '';

    jest.spyOn(localStorageMock, 'getItem').mockReturnValueOnce(token);
    jest.spyOn(localStorageMock, 'getItem').mockReturnValueOnce(idCliente);

    const routerNavigateSpy = jest.spyOn(routerMock, 'navigate');

    component.loginVerify();

    expect(localStorageMock.getItem).toHaveBeenCalledWith('token');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('idCliente');
    expect(routerNavigateSpy).toHaveBeenCalledWith(['carrito/' + idCliente + '/' + component.idProducto]);
  });
  

  it('should show error if token is not present', () => {
    const localStorageGetItemSpy = jest.spyOn(localStorage, 'getItem');
    localStorageGetItemSpy.mockReturnValueOnce(null);

    const toastrErrorSpy = jest.spyOn(toastrMock, 'error');

    component.loginVerify();

    expect(localStorageGetItemSpy).toHaveBeenCalledWith('token');
    expect(toastrErrorSpy).toHaveBeenCalledWith('Debe ingresar para poder añadir productos al carrito', 'Acción Inválida');
  });
  
});
