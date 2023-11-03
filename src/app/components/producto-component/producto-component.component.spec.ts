import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoComponentComponent } from './producto-component.component';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

class ProductoServiceMock{
  getProductos(){
    return;
  }
  getProducto(){
    return;
  }
}

class ActivatedRouteMock{

}
class RouterMock{

}
class ToastrServiceMock{
  
}

describe('ProductoComponentComponent', () => {
  let component: ProductoComponentComponent;
  let fixture: ComponentFixture<ProductoComponentComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
