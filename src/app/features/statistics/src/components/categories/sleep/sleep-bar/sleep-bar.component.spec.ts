import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepBarComponent } from './sleep-bar.component';

describe('SleepBarComponent', () => {
  let component: SleepBarComponent;
  let fixture: ComponentFixture<SleepBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
