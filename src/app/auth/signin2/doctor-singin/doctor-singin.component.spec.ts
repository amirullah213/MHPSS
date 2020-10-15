import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSinginComponent } from './doctor-singin.component';

describe('DoctorSinginComponent', () => {
  let component: DoctorSinginComponent;
  let fixture: ComponentFixture<DoctorSinginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSinginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSinginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
