import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiSideBarComponent } from './epi-side-bar.component';

describe('EpiSideBarComponent', () => {
  let component: EpiSideBarComponent;
  let fixture: ComponentFixture<EpiSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpiSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpiSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
