import { TestBed } from '@angular/core/testing';

import { ProductoService } from './producto.service';
import { HttpClient } from '@angular/common/http';

class HttpClientMock{

}

describe('ProductoService', () => {
  let service: ProductoService;
  let httpClientMock:HttpClientMock

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoService],
      providers:[{provide: HttpClient, useClass: HttpClientMock}]
    });
    service = TestBed.inject(ProductoService);
    httpClientMock = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});