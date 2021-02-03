import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargeCardComponent } from './discharge-card.component';

describe('DischargeCardComponent', () => {
  let component: DischargeCardComponent;
  let fixture: ComponentFixture<DischargeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
