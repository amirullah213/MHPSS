import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrSummaryReportComponent } from './emr-summary-report.component';

describe('EmrSummaryReportComponent', () => {
  let component: EmrSummaryReportComponent;
  let fixture: ComponentFixture<EmrSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmrSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmrSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
