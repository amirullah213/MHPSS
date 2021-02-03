import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BincardItemsComponent } from './bincard-items.component';

describe('BincardItemsComponent', () => {
  let component: BincardItemsComponent;
  let fixture: ComponentFixture<BincardItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BincardItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BincardItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
