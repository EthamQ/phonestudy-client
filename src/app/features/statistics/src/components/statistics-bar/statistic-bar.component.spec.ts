import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticDetailBarComponent } from './statistic-bar.component';

describe('StatisticDetailBarComponent', () => {
  let component: StatisticDetailBarComponent;
  let fixture: ComponentFixture<StatisticDetailBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticDetailBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticDetailBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
