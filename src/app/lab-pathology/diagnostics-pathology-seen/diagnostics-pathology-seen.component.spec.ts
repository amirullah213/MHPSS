import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsPathologySeenComponent } from './diagnostics-pathology-seen.component';

describe('DiagnosticsPathologySeenComponent', () => {
  let component: DiagnosticsPathologySeenComponent;
  let fixture: ComponentFixture<DiagnosticsPathologySeenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticsPathologySeenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticsPathologySeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
