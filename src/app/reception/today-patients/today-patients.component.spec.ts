import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayPatientsComponent } from './today-patients.component';

describe('TodayPatientsComponent', () => {
  let component: TodayPatientsComponent;
  let fixture: ComponentFixture<TodayPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
