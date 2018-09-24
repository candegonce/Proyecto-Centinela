import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicionesDispositivoComponent } from './mediciones-dispositivo.component';

describe('MedicionesDispositivoComponent', () => {
  let component: MedicionesDispositivoComponent;
  let fixture: ComponentFixture<MedicionesDispositivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicionesDispositivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicionesDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
