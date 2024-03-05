import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductosComponentComponent } from './editar-productos-component.component';

describe('EditarProductosComponentComponent', () => {
  let component: EditarProductosComponentComponent;
  let fixture: ComponentFixture<EditarProductosComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarProductosComponentComponent]
    });
    fixture = TestBed.createComponent(EditarProductosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
