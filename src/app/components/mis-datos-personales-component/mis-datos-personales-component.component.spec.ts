import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDatosPersonalesComponentComponent } from './mis-datos-personales-component.component';

describe('MisDatosPersonalesComponentComponent', () => {
  let component: MisDatosPersonalesComponentComponent;
  let fixture: ComponentFixture<MisDatosPersonalesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisDatosPersonalesComponentComponent]
    });
    fixture = TestBed.createComponent(MisDatosPersonalesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
