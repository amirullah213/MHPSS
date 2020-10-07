import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarReceptionComponent } from './side-bar-reception.component';

describe('SideBarReceptionComponent', () => {
  let component: SideBarReceptionComponent;
  let fixture: ComponentFixture<SideBarReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
