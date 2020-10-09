import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisSeenRadComponent } from './diagnosis-seen-rad.component';

describe('DiagnosisSeenRadComponent', () => {
  let component: DiagnosisSeenRadComponent;
  let fixture: ComponentFixture<DiagnosisSeenRadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisSeenRadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisSeenRadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
