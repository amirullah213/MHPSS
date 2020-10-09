import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabRadiologyComponent } from './lab-radiology.component';

describe('LabRadiologyComponent', () => {
  let component: LabRadiologyComponent;
  let fixture: ComponentFixture<LabRadiologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabRadiologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabRadiologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
