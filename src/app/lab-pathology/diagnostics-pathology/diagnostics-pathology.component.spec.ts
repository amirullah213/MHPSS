import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsPathologyComponent } from './diagnostics-pathology.component';

describe('DiagnosticsPathologyComponent', () => {
  let component: DiagnosticsPathologyComponent;
  let fixture: ComponentFixture<DiagnosticsPathologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticsPathologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticsPathologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
