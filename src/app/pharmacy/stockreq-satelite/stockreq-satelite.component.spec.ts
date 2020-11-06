import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockreqSateliteComponent } from './stockreq-satelite.component';

describe('StockreqSateliteComponent', () => {
  let component: StockreqSateliteComponent;
  let fixture: ComponentFixture<StockreqSateliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockreqSateliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockreqSateliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
