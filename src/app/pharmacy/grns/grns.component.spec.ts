import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnsComponent } from './grns.component';

describe('GrnsComponent', () => {
  let component: GrnsComponent;
  let fixture: ComponentFixture<GrnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
