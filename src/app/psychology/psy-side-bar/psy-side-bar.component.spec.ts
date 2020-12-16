import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsySideBarComponent } from './psy-side-bar.component';

describe('PsySideBarComponent', () => {
  let component: PsySideBarComponent;
  let fixture: ComponentFixture<PsySideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsySideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsySideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
