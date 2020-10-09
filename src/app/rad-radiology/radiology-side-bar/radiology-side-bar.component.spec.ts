import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologySideBarComponent } from './radiology-side-bar.component';

describe('RadiologySideBarComponent', () => {
  let component: RadiologySideBarComponent;
  let fixture: ComponentFixture<RadiologySideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiologySideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiologySideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
