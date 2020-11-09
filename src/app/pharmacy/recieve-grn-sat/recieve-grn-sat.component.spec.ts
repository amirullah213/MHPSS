import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieveGrnSatComponent } from './recieve-grn-sat.component';

describe('RecieveGrnSatComponent', () => {
  let component: RecieveGrnSatComponent;
  let fixture: ComponentFixture<RecieveGrnSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecieveGrnSatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecieveGrnSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
