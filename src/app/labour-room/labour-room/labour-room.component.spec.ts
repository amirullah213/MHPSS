import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourRoomComponent } from './labour-room.component';

describe('LabourRoomComponent', () => {
  let component: LabourRoomComponent;
  let fixture: ComponentFixture<LabourRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
