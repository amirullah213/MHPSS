import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologyListComponent } from './pathology-list.component';

describe('PathologyListComponent', () => {
  let component: PathologyListComponent;
  let fixture: ComponentFixture<PathologyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathologyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathologyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
