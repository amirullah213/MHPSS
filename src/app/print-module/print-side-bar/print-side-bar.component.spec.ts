import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSideBarComponent } from './print-side-bar.component';

describe('PrintSideBarComponent', () => {
  let component: PrintSideBarComponent;
  let fixture: ComponentFixture<PrintSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
