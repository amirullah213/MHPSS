import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmrPatDetailComponent } from './smr-pat-detail.component';

describe('SmrPatDetailComponent', () => {
  let component: SmrPatDetailComponent;
  let fixture: ComponentFixture<SmrPatDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmrPatDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmrPatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
