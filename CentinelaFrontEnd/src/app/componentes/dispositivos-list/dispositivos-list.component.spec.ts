import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivosListComponent } from './dispositivos-list.component';

describe('DispositivosListComponent', () => {
  let component: DispositivosListComponent;
  let fixture: ComponentFixture<DispositivosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
