import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivoPropioComponent } from './dispositivo-propio.component';

describe('DispositivoPropioComponent', () => {
  let component: DispositivoPropioComponent;
  let fixture: ComponentFixture<DispositivoPropioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivoPropioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivoPropioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
