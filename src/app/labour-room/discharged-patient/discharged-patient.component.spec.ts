import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargedPatientComponent } from './discharged-patient.component';

describe('DischargedPatientComponent', () => {
  let component: DischargedPatientComponent;
  let fixture: ComponentFixture<DischargedPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargedPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargedPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
