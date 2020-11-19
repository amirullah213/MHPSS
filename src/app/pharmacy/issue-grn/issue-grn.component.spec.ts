import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueGrnComponent } from './issue-grn.component';

describe('IssueGrnComponent', () => {
  let component: IssueGrnComponent;
  let fixture: ComponentFixture<IssueGrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueGrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
