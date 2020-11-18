import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllgrnsComponent } from './allgrns.component';

describe('AllgrnsComponent', () => {
  let component: AllgrnsComponent;
  let fixture: ComponentFixture<AllgrnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllgrnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllgrnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
