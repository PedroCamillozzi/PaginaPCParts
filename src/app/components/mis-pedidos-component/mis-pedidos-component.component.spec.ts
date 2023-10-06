import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPedidosComponentComponent } from './mis-pedidos-component.component';

describe('MisPedidosComponentComponent', () => {
  let component: MisPedidosComponentComponent;
  let fixture: ComponentFixture<MisPedidosComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisPedidosComponentComponent]
    });
    fixture = TestBed.createComponent(MisPedidosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
