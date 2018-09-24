import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivoDetalleComponent } from './dispositivo-detalle.component';

describe('DispositivoDetalleComponent', () => {
  let component: DispositivoDetalleComponent;
  let fixture: ComponentFixture<DispositivoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
