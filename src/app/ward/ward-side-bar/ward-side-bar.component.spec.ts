import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardSideBarComponent } from './ward-side-bar.component';

describe('WardSideBarComponent', () => {
  let component: WardSideBarComponent;
  let fixture: ComponentFixture<WardSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
