import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPedidosComponentComponent } from './mis-pedidos-component.component';
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';

class PedidoServiceMock{

}

class RouterMock{

}

describe('MisPedidosComponentComponent', () => {
  let component: MisPedidosComponentComponent;
  let fixture: ComponentFixture<MisPedidosComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisPedidosComponentComponent],
      providers: [{provide: PedidoService, useClass: PedidoServiceMock},
        {provide: Router, useClass: RouterMock}
        ]
    });
    fixture = TestBed.createComponent(MisPedidosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
