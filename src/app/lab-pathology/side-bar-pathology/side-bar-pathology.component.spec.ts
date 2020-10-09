import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarPathologyComponent } from './side-bar-pathology.component';

describe('SideBarPathologyComponent', () => {
  let component: SideBarPathologyComponent;
  let fixture: ComponentFixture<SideBarPathologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarPathologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarPathologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
