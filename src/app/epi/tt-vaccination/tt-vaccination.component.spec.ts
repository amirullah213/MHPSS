import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TTVaccinationComponent } from './tt-vaccination.component';

describe('TTVaccinationComponent', () => {
  let component: TTVaccinationComponent;
  let fixture: ComponentFixture<TTVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TTVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TTVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
