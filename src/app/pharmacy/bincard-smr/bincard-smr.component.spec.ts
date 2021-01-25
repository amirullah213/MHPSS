import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BincardSmrComponent } from './bincard-smr.component';

describe('BincardSmrComponent', () => {
  let component: BincardSmrComponent;
  let fixture: ComponentFixture<BincardSmrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BincardSmrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BincardSmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
