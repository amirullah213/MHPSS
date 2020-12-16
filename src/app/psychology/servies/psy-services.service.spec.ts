import { TestBed } from '@angular/core/testing';

import { PsyServicesService } from './psy-services.service';

describe('PsyServicesService', () => {
  let service: PsyServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsyServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
