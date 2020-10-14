import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineDiscardComponent } from './medicine-discard.component';

describe('MedicineDiscardComponent', () => {
  let component: MedicineDiscardComponent;
  let fixture: ComponentFixture<MedicineDiscardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineDiscardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineDiscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
