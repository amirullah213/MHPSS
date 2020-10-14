import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineGrnComponent } from './medicine-grn.component';

describe('MedicineGrnComponent', () => {
  let component: MedicineGrnComponent;
  let fixture: ComponentFixture<MedicineGrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineGrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
