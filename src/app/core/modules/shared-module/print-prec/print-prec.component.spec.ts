import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPrecComponent } from './print-prec.component';

describe('PrintPrecComponent', () => {
  let component: PrintPrecComponent;
  let fixture: ComponentFixture<PrintPrecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPrecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
