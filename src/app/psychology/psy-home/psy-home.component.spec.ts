import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsyHomeComponent } from './psy-home.component';

describe('PsyHomeComponent', () => {
  let component: PsyHomeComponent;
  let fixture: ComponentFixture<PsyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
