import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Print2Component } from './print2.component';

describe('Print2Component', () => {
  let component: Print2Component;
  let fixture: ComponentFixture<Print2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Print2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Print2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
