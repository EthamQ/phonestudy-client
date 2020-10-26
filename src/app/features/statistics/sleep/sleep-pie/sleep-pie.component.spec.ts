import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepPieComponent } from './sleep-pie.component';

describe('SleepPieComponent', () => {
  let component: SleepPieComponent;
  let fixture: ComponentFixture<SleepPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
