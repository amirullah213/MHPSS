import { TestBed } from '@angular/core/testing';

import { LabourRoomSerivce } from './labour-room.service';

describe('LabourRoomSerivce', () => {
  let service: LabourRoomSerivce;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabourRoomSerivce);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
