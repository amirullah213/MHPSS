import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildVaccinationComponent } from './child-vaccination.component';

describe('ChildVaccinationComponent', () => {
  let component: ChildVaccinationComponent;
  let fixture: ComponentFixture<ChildVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
