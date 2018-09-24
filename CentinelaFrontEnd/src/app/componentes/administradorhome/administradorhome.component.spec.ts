import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorhomeComponent } from './administradorhome.component';

describe('AdministradorhomeComponent', () => {
  let component: AdministradorhomeComponent;
  let fixture: ComponentFixture<AdministradorhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
