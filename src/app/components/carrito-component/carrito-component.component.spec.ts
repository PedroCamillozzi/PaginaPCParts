import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoComponentComponent } from './carrito-component.component';
import { CarritoService } from 'src/app/services/carrito.service';

class CarritoServiceMock{
  getProductosCarritoCliente(){
    return;
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




describe('CarritoComponentComponent', () => {
  let component: CarritoComponentComponent;
  let fixture: ComponentFixture<CarritoComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoComponentComponent],
      providers:[{ provide: CarritoService, useClass: CarritoServiceMock},
                 ]
    });
    fixture = TestBed.createComponent(CarritoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
