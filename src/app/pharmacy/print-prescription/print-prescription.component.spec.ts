import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPrescriptionComponent } from './print-prescription.component';

describe('PrintPrescriptionComponent', () => {
  let component: PrintPrescriptionComponent;
  let fixture: ComponentFixture<PrintPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
