import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPathComponent } from './lab-path.component';

describe('LabPathComponent', () => {
  let component: LabPathComponent;
  let fixture: ComponentFixture<LabPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
