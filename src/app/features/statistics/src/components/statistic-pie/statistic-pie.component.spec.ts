import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticDetailPieComponent } from './statistic-pie.component';

describe('StatisticDetailPieComponent', () => {
  let component: StatisticDetailPieComponent;
  let fixture: ComponentFixture<StatisticDetailPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticDetailPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticDetailPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
