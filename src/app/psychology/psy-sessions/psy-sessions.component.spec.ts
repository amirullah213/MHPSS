import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsySessionsComponent } from './psy-sessions.component';

describe('PsySessionsComponent', () => {
  let component: PsySessionsComponent;
  let fixture: ComponentFixture<PsySessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsySessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsySessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
