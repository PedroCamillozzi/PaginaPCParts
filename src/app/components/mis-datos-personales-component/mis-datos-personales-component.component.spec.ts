import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDatosPersonalesComponentComponent } from './mis-datos-personales-component.component';
import { ClienteService } from '../../services/cliente.service';
import { ErrorService } from '../../services/error.service';
import { ToastrService } from 'ngx-toastr';

class ClienteServiceMock{

}

class ErrorServiceMock{

}

class ToastrServiceMock{

}

describe('MisDatosPersonalesComponentComponent', () => {
  let component: MisDatosPersonalesComponentComponent;
  let fixture: ComponentFixture<MisDatosPersonalesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisDatosPersonalesComponentComponent],
      providers: [{provide: ClienteService, useClass: ClienteServiceMock},
                  {provide: ErrorService, useClass: ErrorServiceMock},
                  {provide: ToastrService, useClass: ToastrServiceMock}]
    });
    fixture = TestBed.createComponent(MisDatosPersonalesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
