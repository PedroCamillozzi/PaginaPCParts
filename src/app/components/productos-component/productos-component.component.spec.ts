import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosComponentComponent } from './productos-component.component';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { PrecioProductoService } from '../../services/precioProducto.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

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

class RouterMock{

}

describe('ProductosComponentComponent', () => {
  let component: ProductosComponentComponent;
  let fixture: ComponentFixture<ProductosComponentComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('redirect to producto', ()=>{
    const router = TestBed.inject(Router);
    //const spyNavigate = spyOn(router, 'producto/'+idProducto)
    //component.goToTarget('producto/'+idProducto);
   // expect(spyNavigate).toHaveBeenCalled()
    //expect(spyNavigate).toHaveBeenCalledWith(['producto'/+idProducto]);
  })
});
