import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispenseStockComponent } from './dispense-stock.component';

describe('DispenseStockComponent', () => {
  let component: DispenseStockComponent;
  let fixture: ComponentFixture<DispenseStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispenseStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispenseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
