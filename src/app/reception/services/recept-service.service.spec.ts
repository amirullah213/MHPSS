import { TestBed } from '@angular/core/testing';

import { ReceptServiceService } from './recept-service.service';

describe('ReceptServiceService', () => {
  let service: ReceptServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceptServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
