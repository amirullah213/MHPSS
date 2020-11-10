import { TestBed } from '@angular/core/testing';

import { OTService } from './operation.service';

describe('VitalsService', () => {
  let service: OTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
