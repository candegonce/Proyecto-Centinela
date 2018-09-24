import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivoCrearComponent } from './dispositivo-crear.component';

describe('DispositivoCrearComponent', () => {
  let component: DispositivoCrearComponent;
  let fixture: ComponentFixture<DispositivoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
