import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargePatientMedicineComponent } from './discharge-patient-medicine.component';

describe('DischargePatientMedicineComponent', () => {
  let component: DischargePatientMedicineComponent;
  let fixture: ComponentFixture<DischargePatientMedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargePatientMedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargePatientMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
