import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsStatusComponent } from './items-status.component';

describe('ItemsStatusComponent', () => {
  let component: ItemsStatusComponent;
  let fixture: ComponentFixture<ItemsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
