import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponentComponent } from './navbar-component.component';
import { Observable } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { PrecioProductoService } from '../../services/precioProducto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

class RouterMock{

}

class ProductoServiceMock{
  getProductos():Observable<any>{
    const producto:any = null
    return producto ;
  }
  getProducto(){
    return;
  }
}

class PrecioProductoServiceMock{
  getPrecioProducto(){
    return;
  }
}

class ToastrServiceMock{
  
}
describe('NavbarComponentComponent', () => {
  let component: NavbarComponentComponent;
  let fixture: ComponentFixture<NavbarComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponentComponent],
      providers: [{provide: ProductoService, useClass: ProductoServiceMock},
                  {provide: PrecioProductoService, useClass: PrecioProductoServiceMock},
                  {provide: ToastrService, useClass: ToastrServiceMock},
                  {provide: Router, useClass: RouterMock}]
    });
    fixture = TestBed.createComponent(NavbarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
