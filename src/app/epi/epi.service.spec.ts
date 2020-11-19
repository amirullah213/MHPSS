import { TestBed } from '@angular/core/testing';

import { epiService } from './epi.serivce';

describe('epiService', () => {
  let service: epiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(epiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
