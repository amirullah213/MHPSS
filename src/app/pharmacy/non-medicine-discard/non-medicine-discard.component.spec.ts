import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonMedicineDiscardComponent } from './non-medicine-discard.component';

describe('NonMedicineDiscardComponent', () => {
  let component: NonMedicineDiscardComponent;
  let fixture: ComponentFixture<NonMedicineDiscardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonMedicineDiscardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonMedicineDiscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
