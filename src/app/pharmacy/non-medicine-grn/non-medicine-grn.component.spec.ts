import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonMedicineGrnComponent } from './non-medicine-grn.component';

describe('NonMedicineGrnComponent', () => {
  let component: NonMedicineGrnComponent;
  let fixture: ComponentFixture<NonMedicineGrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonMedicineGrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonMedicineGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
