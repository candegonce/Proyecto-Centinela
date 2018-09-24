import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivosPropiosComponent } from './dispositivos-propios.component';

describe('DispositivosPropiosComponent', () => {
  let component: DispositivosPropiosComponent;
  let fixture: ComponentFixture<DispositivosPropiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivosPropiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivosPropiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
