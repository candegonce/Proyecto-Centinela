import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivosActivosComponent } from './dispositivos-activos.component';

describe('DispositivosActivosComponent', () => {
  let component: DispositivosActivosComponent;
  let fixture: ComponentFixture<DispositivosActivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivosActivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
