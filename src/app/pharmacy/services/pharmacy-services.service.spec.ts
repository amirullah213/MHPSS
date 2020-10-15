import { TestBed } from '@angular/core/testing';

import { PharmacyServicesService } from './pharmacy-services.service';

describe('PharmacyServicesService', () => {
  let service: PharmacyServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmacyServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
