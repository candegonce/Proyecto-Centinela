import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioBorrarComponent } from './usuario-borrar.component';

describe('UsuarioBorrarComponent', () => {
  let component: UsuarioBorrarComponent;
  let fixture: ComponentFixture<UsuarioBorrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioBorrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
