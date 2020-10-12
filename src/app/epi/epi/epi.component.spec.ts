import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiComponent } from './epi.component';

describe('EpiComponent', () => {
  let component: EpiComponent;
  let fixture: ComponentFixture<EpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
