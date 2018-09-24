import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivoEditarComponent } from './dispositivo-editar.component';

describe('DispositivoEditarComponent', () => {
  let component: DispositivoEditarComponent;
  let fixture: ComponentFixture<DispositivoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
