import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaSeenPatientsComponent } from './pharma-seen-patients.component';

describe('PharmaSeenPatientsComponent', () => {
  let component: PharmaSeenPatientsComponent;
  let fixture: ComponentFixture<PharmaSeenPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmaSeenPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaSeenPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
