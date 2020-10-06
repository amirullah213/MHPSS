import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldRegistrationComponent } from './old-registration.component';

describe('OldRegistrationComponent', () => {
  let component: OldRegistrationComponent;
  let fixture: ComponentFixture<OldRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
