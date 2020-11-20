import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRadiologyComponent } from './print-radiology.component';

describe('PrintRadiologyComponent', () => {
  let component: PrintRadiologyComponent;
  let fixture: ComponentFixture<PrintRadiologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintRadiologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintRadiologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
