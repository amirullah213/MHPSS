import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidReportPatComponent } from './covid-report-pat.component';

describe('CovidReportPatComponent', () => {
  let component: CovidReportPatComponent;
  let fixture: ComponentFixture<CovidReportPatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidReportPatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidReportPatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
