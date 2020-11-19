import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeenPatientsComponent } from './seen-patients.component';

describe('SeenPatientsComponent', () => {
  let component: SeenPatientsComponent;
  let fixture: ComponentFixture<SeenPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeenPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeenPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
