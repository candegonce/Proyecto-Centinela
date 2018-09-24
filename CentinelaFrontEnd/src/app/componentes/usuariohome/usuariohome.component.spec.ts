import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariohomeComponent } from './usuariohome.component';

describe('UsuariohomeComponent', () => {
  let component: UsuariohomeComponent;
  let fixture: ComponentFixture<UsuariohomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariohomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariohomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
