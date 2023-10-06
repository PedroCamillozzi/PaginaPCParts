import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosComponentComponent } from './productos-component.component';
import { Router } from '@angular/router';

describe('ProductosComponentComponent', () => {
  let component: ProductosComponentComponent;
  let fixture: ComponentFixture<ProductosComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosComponentComponent]
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
