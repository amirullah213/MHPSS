import { TestBed } from '@angular/core/testing';

import { PathologyGuard } from './pathology.guard';

describe('PathologyGuard', () => {
  let guard: PathologyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PathologyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
