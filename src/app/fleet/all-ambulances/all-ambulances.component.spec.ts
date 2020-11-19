import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAmbulancesComponent } from './all-ambulances.component';

describe('AllAmbulancesComponent', () => {
  let component: AllAmbulancesComponent;
  let fixture: ComponentFixture<AllAmbulancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAmbulancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAmbulancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
