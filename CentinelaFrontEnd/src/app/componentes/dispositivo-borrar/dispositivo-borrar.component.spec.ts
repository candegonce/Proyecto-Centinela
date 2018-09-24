import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivoBorrarComponent } from './dispositivo-borrar.component';

describe('DispositivoBorrarComponent', () => {
  let component: DispositivoBorrarComponent;
  let fixture: ComponentFixture<DispositivoBorrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivoBorrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivoBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
