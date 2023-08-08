import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoComponentComponent } from './carrito-component.component';

describe('CarritoComponentComponent', () => {
  let component: CarritoComponentComponent;
  let fixture: ComponentFixture<CarritoComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoComponentComponent]
    });
    fixture = TestBed.createComponent(CarritoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
