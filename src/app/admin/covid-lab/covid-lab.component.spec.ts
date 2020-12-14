import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidLabComponent } from './covid-lab.component';

describe('CovidLabComponent', () => {
  let component: CovidLabComponent;
  let fixture: ComponentFixture<CovidLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
