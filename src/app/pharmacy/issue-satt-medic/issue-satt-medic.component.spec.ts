import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueSattMedicComponent } from './issue-satt-medic.component';

describe('IssueSattMedicComponent', () => {
  let component: IssueSattMedicComponent;
  let fixture: ComponentFixture<IssueSattMedicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueSattMedicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueSattMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
