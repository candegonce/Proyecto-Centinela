import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivoActivoComponent } from './dispositivo-activo.component';

describe('DispositivoActivoComponent', () => {
  let component: DispositivoActivoComponent;
  let fixture: ComponentFixture<DispositivoActivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivoActivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
