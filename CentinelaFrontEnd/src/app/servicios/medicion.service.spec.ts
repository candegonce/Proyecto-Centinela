import { TestBed, inject } from '@angular/core/testing';

import { MedicionService } from './medicion.service';

describe('MedicionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicionService]
    });
  });

  it('should be created', inject([MedicionService], (service: MedicionService) => {
    expect(service).toBeTruthy();
  }));
});
