import { TestBed } from '@angular/core/testing';

import { RadServiceService } from './rad-service.service';

describe('RadServiceService', () => {
  let service: RadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
