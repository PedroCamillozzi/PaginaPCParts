import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductoService } from './producto.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { ProductoPrecio } from '../interfaces/ProductoPrecio';
import { PrecioProducto } from '../interfaces/PrecioProductos';
import { Producto } from '../interfaces/Producto';


describe('ProductoService', () => {
  let service: ProductoService;
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[{provide: HttpClient}]
    });
    service = TestBed.inject(ProductoService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController)
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    const mockProductos = [
      { idProducto: 1, nombreProducto: 'I5', descripcion:"Bueno", detallesGenerales: "OK", stock: 10 },
      { idProducto: 2, nombreProducto: 'I3', descripcion:"Malo", detallesGenerales: "OKs", stock: 5 }
    ];

    service.getProductos().subscribe(data => {
      expect(data).toEqual(mockProductos);
    });

    const req = httpTestingController.expectOne(`${environment.endpoint}productos/all`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProductos);
  });

  it('should get product', () => {
    const mockProductos:Producto = { idProducto: 1, nombreProducto: 'I5', descripcion:"Bueno", detallesGenerales: "OK", stock: 10 };

    service.getProducto(mockProductos.idProducto.toString()).subscribe(data => {
      expect(data).toEqual(mockProductos);
    });

    const req = httpTestingController.expectOne(`${environment.endpoint}productos/${mockProductos.idProducto}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProductos);
  });

  it('should update a product', () => { 
    const productoConPrecio: ProductoPrecio = { idProducto: 2, nombreProducto: 'I3', descripcion:"Malo", detallesGenerales: "OKs", stock: 5, fechaDesde: new Date(), precio: 1500 };

    service.putProducto(productoConPrecio).subscribe(data => {
      expect(data).toEqual(productoConPrecio);
    });

    const req = httpTestingController.expectOne(`${environment.endpoint}productos/put`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(productoConPrecio);
    req.flush(productoConPrecio);
  });

  it('should create a new product', () => {
    const productoCreado: ProductoPrecio = { idProducto: 2, nombreProducto: 'I3', descripcion:"Malo", detallesGenerales: "OKs", stock: 5, fechaDesde: new Date(), precio: 1500 };
    const precioProducto: PrecioProducto = { idProducto: 2, fechaDesde: new Date(), precio: 1500 };
    

    service.postProducto(precioProducto).subscribe(data => {
      expect(data).toEqual(productoCreado);
    });

    const req = httpTestingController.expectOne(`${environment.endpoint}productos/`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(precioProducto);
    req.flush(productoCreado);
  });

  it('should delete a product', () => {
    const idProducto = '1';

    service.deleteProducto(idProducto).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.endpoint}productos/${idProducto}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});