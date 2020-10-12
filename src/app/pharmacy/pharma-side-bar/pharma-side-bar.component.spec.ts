import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaSideBarComponent } from './pharma-side-bar.component';

describe('PharmaSideBarComponent', () => {
  let component: PharmaSideBarComponent;
  let fixture: ComponentFixture<PharmaSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmaSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
