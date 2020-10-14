import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationSideBarComponent } from './operation-side-bar.component';

describe('OperationSideBarComponent', () => {
  let component: OperationSideBarComponent;
  let fixture: ComponentFixture<OperationSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
