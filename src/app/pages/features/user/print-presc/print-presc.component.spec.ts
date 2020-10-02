import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPrescComponent } from './print-presc.component';

describe('PrintPrescComponent', () => {
  let component: PrintPrescComponent;
  let fixture: ComponentFixture<PrintPrescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPrescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPrescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
