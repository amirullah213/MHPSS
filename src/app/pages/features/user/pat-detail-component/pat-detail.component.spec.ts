import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatDetailComponent } from './pat-detail.component';

describe('PatDetailComponent', () => {
  let component: PatDetailComponent;
  let fixture: ComponentFixture<PatDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
