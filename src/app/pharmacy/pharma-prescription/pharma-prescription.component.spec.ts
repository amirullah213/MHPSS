import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaPrescriptionComponent } from './pharma-prescription.component';

describe('PharmaPrescriptionComponent', () => {
  let component: PharmaPrescriptionComponent;
  let fixture: ComponentFixture<PharmaPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmaPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
