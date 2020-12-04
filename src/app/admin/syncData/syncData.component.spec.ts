import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { syncDataComponent } from './syncData.component';

describe('syncDataComponent', () => {
  let component: syncDataComponent;
  let fixture: ComponentFixture<syncDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ syncDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(syncDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
