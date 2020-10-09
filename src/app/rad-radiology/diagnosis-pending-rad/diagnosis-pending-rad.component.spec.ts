import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisPendingRadComponent } from './diagnosis-pending-rad.component';

describe('DiagnosisPendingRadComponent', () => {
  let component: DiagnosisPendingRadComponent;
  let fixture: ComponentFixture<DiagnosisPendingRadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisPendingRadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisPendingRadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
