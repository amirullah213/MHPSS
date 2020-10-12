import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaPendingPatientsComponent } from './pharma-pending-patients.component';

describe('PharmaPendingPatientsComponent', () => {
  let component: PharmaPendingPatientsComponent;
  let fixture: ComponentFixture<PharmaPendingPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmaPendingPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaPendingPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
