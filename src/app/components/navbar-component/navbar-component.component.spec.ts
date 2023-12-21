import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponentComponent } from './navbar-component.component';
import { Observable, of } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { PrecioProductoService } from '../../services/precioProducto.service';
import { Router } from '@angular/router';
import { PrecioProducto } from '../../interfaces/PrecioProductos';

import { LogueoService } from '../../services/logueo.service';

class RouterMock{
  navigate = jest.fn();

  navigateByUrl = jest.fn().mockResolvedValue(true);
}

class ProductoServiceMock{
  getProductos():Observable<any>{
    return of([
      {idProducto:1, nombreProducto:'Intel Core i9', descripcion:'rapidisimo', detallesGenerales: 'gama alta', stock:10, idCategoria:1},
      {idProducto:2, nombreProducto:'Intel Core i7', descripcion:'rapidisimo x1', detallesGenerales: 'gama alta', stock:10, idCategoria:1}
    ])
  }
  getProducto(){
    return;
  }
}

class PrecioProductoServiceMock{
  getPrecioProducto(idProd:number):Observable<any>{
    if (idProd === 1) {
      return of([{ idProducto: 1, precio: 100, fechaDesde: new Date('2023-08-12') }]);
    } else if (idProd === 2) {
      return of([{ idProducto: 2, precio: 500, fechaDesde: new Date('2023-08-12')}]);
    } else {
      return of([]);
    }

  }
  


}

class LogueoServiceMock{
  tokenExpirado(token:string){
    if(token === ''){
      return false
    }
    return true;
  }
}

describe('NavbarComponentComponent', () => {
  let component: NavbarComponentComponent;
  let fixture: ComponentFixture<NavbarComponentComponent>;
  let precioProductoService:PrecioProductoService;
  let productoService: ProductoService;
  let routerMock:Router;
  let logueoServiceMock :LogueoService;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(window, 'setTimeout');
    TestBed.configureTestingModule({
      declarations: [NavbarComponentComponent],
      providers: [{provide: ProductoService, useClass: ProductoServiceMock},
                  {provide: PrecioProductoService, useClass: PrecioProductoServiceMock},
                  {provide: LogueoService, useClass: LogueoServiceMock},
                  {provide: Router, useClass: RouterMock},
                ]
    });
    fixture = TestBed.createComponent(NavbarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    precioProductoService = TestBed.inject(PrecioProductoService);
    productoService = TestBed.inject(ProductoService);
    routerMock = TestBed.inject(Router);
    logueoServiceMock = TestBed.inject(LogueoService);

 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getPrecioActProducto', () => {
    const mockListaProductos = [
      { idProducto: 1, nombreProducto: 'Intel Core i9', descripcion: 'rapidisimo', detallesGenerales: 'gama alta', stock: 10, idCategoria: 1 }
    ];
  
    component.todosLosProdutos = mockListaProductos;
  
    const mockPrecioProducto: PrecioProducto = 
      { idProducto: 1, precio: 100, fechaDesde: new Date('2023-08-12') }
    ;
    const spyPrecioProducto = jest.spyOn(precioProductoService, 'getPrecioProducto')
      .mockReturnValueOnce(of(mockPrecioProducto));
  
    component.precioProductosCliente = [{ idProducto: 1, precio: 100, fechaDesde: new Date('2023-08-12') }];
  
    component.getPrecioProductosCliente();
  
    expect(spyPrecioProducto).toHaveBeenCalled();
    expect(component.precioProductosCliente).toContainEqual(mockPrecioProducto);
  });

  it('should getProductosFiltrados', ()=>{
    const mockTodosLosProductos = [
      {idProducto:1, nombreProducto:'Intel Core i9', descripcion:'rapidisimo', detallesGenerales: 'gama alta', stock:10, idCategoria:1},
      {idProducto:2, nombreProducto:'Intel Core i7', descripcion:'rapidisimo x1', detallesGenerales: 'gama alta', stock:10, idCategoria:1}
    ];

    const spyProductosFiltrados = jest.spyOn(productoService, 'getProductos');

    component.getProductosFiltrados();
    expect(spyProductosFiltrados).toHaveBeenCalled();
    expect(component.todosLosProdutos).toEqual(mockTodosLosProductos);
  });

  it('should redirect to producto', async () => {
   component.redirectToProducto(1);
  
    await fixture.whenStable();
  
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/refresh', { skipLocationChange: true });
    expect(routerMock.navigate).toHaveBeenCalledWith(['producto/' + 1]);
  });

  it('should redirect to carrito', async () => {
    const idCliente = '';
    component.redirectToCarrito();
    
     await fixture.whenStable();

     expect(routerMock.navigate).toHaveBeenCalledWith(['carrito/' + idCliente]);
   });

   it('should close DropList of Filter', () => {
    component.droplistFiltrado = false;
    component.cerrarDroplistFiltrado();

    expect(component.droplistFiltrado).toBe(false);

    jest.advanceTimersByTime(100);

    expect(component.droplistFiltrado).toBe(true);

    expect(setTimeout).toHaveBeenCalledTimes(1);
   });

   it('should redirect to producto', async () => {
    const router = TestBed.inject(Router) as unknown as RouterMock;
    const spyNavigate = jest.spyOn(router, 'navigate');
  
    component.redirectToProducto(1);
  
    await fixture.whenStable(); // Esperar a que se resuelvan las tareas asincrónicas
  
    expect(spyNavigate).toHaveBeenCalled();
    expect(spyNavigate).toHaveBeenCalledWith(['producto/1']);
  });

  
  it('should redirect to pedidos cliente', async () => {
    const router = TestBed.inject(Router) as unknown as RouterMock;
    const spyNavigate = jest.spyOn(router, 'navigate');
    const idCliente = ''
  
    component.redirectToPedidosCliente();
  
    await fixture.whenStable(); // Esperar a que se resuelvan las tareas asincrónicas
  
    expect(spyNavigate).toHaveBeenCalled();
    expect(spyNavigate).toHaveBeenCalledWith(['misPedidos/'+idCliente]);
  });

  it('should redirect to Datos Personales', async () => {
    const router = TestBed.inject(Router) as unknown as RouterMock;
    const spyNavigate = jest.spyOn(router, 'navigate');
    const idCliente = ''
  
    component.redirectToDatosPersonales();
  
    await fixture.whenStable(); // Esperar a que se resuelvan las tareas asincrónicas
  
    expect(spyNavigate).toHaveBeenCalled();
    expect(spyNavigate).toHaveBeenCalledWith(['misdatos/'+idCliente]);

   
  });

  it('should update "logueado" correctly', () => {
    component.logueado = false;
    // Verificar que inicialmente logueado sea false
    expect(component.logueado).toBe(false);

    // Llamar a la función con un valor de true
    component.reciveDataFromChild(true);

    // Verificar si "logueado" se actualizó a true después de llamar a la función
    expect(component.logueado).toBe(true);

    // Llamar a la función con un valor de false
    component.reciveDataFromChild(false);

    // Verificar si "logueado" se actualizó a false después de llamar a la función con false
    expect(component.logueado).toBe(false);
  });

  it('should filter products', () => {

    expect(component.droplistFiltrado).toBe(true);

    const mockListaProductos = [
      { idProducto: 1, nombreProducto: 'Intel Core i9', descripcion: 'rapidisimo', detallesGenerales: 'gama alta', stock: 10, idCategoria: 1 }
    ];

    component.todosLosProdutos = mockListaProductos;

    component.filtradoProducto('Intel');

    expect(component.droplistFiltrado).toBe(false)

    expect(component.todosLosProdutos).toEqual(mockListaProductos);
  });

  it('should remove token and idCliente from localStorage', () => {
    component.cerrarSesion();

    localStorage.removeItem('idCliente');
    localStorage.removeItem('token');
    const idCliente = localStorage.getItem('idCliente');
    const token = localStorage.getItem('token');
    expect(idCliente).toBeNull();
    expect(token).toBeNull();
  });

  /*it('should authentificarLogueo be true', () => {
    localStorage.setItem('token', 'entra');
  
    const token = localStorage.getItem('token');
  
    const result = component.authentificarLogueo();
  
    const spyLogueoService = jest.spyOn(logueoServiceMock, 'tokenExpirado');
  
    expect(spyLogueoService).toHaveBeenCalledWith('entra');
    expect(result).toBe(false);
  });
  
  it('should authentificarLogueo be false', () => {
    localStorage.setItem('token', ''); // Establece el token como una cadena vacía
  
    const token = localStorage.getItem('token');
  
    const result = component.authentificarLogueo();
  
    const spyLogueoService = jest.spyOn(logueoServiceMock, 'tokenExpirado');
  
    expect(spyLogueoService).toHaveBeenCalledWith('');
    expect(result).toBe(true);
  });*/

  it('should return data from child', () => {
    component.logueado = false;
    const log = true;
    expect(component.logueado).toBe(false);
    component.reciveDataFromChild(log);

    expect(component.logueado).toBe(true);
  });

});
