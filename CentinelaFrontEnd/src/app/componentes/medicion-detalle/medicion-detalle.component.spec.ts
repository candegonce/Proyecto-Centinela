import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicionDetalleComponent } from './medicion-detalle.component';

describe('MedicionDetalleComponent', () => {
  let component: MedicionDetalleComponent;
  let fixture: ComponentFixture<MedicionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
