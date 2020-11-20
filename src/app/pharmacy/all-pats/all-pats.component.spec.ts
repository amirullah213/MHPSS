import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPatsComponent } from './all-pats.component';

describe('AllPatsComponent', () => {
  let component: AllPatsComponent;
  let fixture: ComponentFixture<AllPatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
